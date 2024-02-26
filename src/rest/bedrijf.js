const Router = require('@koa/router');
const Joi = require('joi');

const bedrijfServer = require('../service/bedrijf');
const validate = require('../core/validation')

const getAllBedrijven = async (ctx) => {
  ctx.body = await bedrijfServer.getAllBedrijven();
};
getAllBedrijven.validationSheme = null

const getBedrijfById = async (ctx) => {
  ctx.body = await bedrijfServer.getBedrijfById(Number(ctx.params.id));
};
getBedrijfById.validationSheme={
  params: {
    id: Joi.number()
      .integer()
      .positive()
  }
}

const findBedrijfByName = async (ctx) => {
    const { naam } = ctx.request.body;
    ctx.body = await bedrijfServer.findBedrijfByName(naam);
  };
  findBedrijfByName.validationSheme={
    body: {
      naam: Joi.string()
    }
  }

const createBedrijf = async (ctx) => {
    const {naam, logo, sector, iban, btwNummer, telefoonnummer, gebruikerSinds, idAdres} = ctx.request.body;
  const newBedrijf = await bedrijfServer.createBedrijf({
    naam: String(naam),
    logo: String(logo),
    sector: String(sector),
    iban: String(iban),
    btwNummer: String(btwNummer),
    telefoonnummer: String(telefoonnummer),
    gebruikerSinds: String(gebruikerSinds),
    idAdres: Number(idAdres)
  });
  ctx.body = newBedrijf;
  ctx.status = 201;
};
createBedrijf.validationSheme={
    body: {
        naam: Joi.string().required().invalid(' ', ''),
        logo: Joi.string().required().invalid(' ', ''),
        sector: Joi.string().required().invalid(' ', ''),
        iban: Joi.string().required().invalid(' ', ''),
        btwNummer: Joi.string().required().invalid(' ', ''),
        telefoonnummer: Joi.string().required().invalid(' ', ''),
        gebruikerSinds: Joi.string().required().invalid(' ', ''),
        idAdres: Joi.number().integer().positive()
    }
}

const updateBedrijfById = async (ctx) => {
    const {naam, logo, sector, iban, btwNummer, telefoonnummer, gebruikerSinds, idAdres} = ctx.request.body;
  ctx.body = await bedrijfServer.updateBedrijfById(Number(ctx.params.id), {
    naam: String(naam),
    logo: String(logo),
    sector: String(sector),
    iban: String(iban),
    btwNummer: String(btwNummer),
    telefoonnummer: String(telefoonnummer),
    gebruikerSinds: String(gebruikerSinds),
    idAdres: Number(idAdres)
  });
  ctx.status = 200;
};
updateBedrijfById.validationSheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    naam: Joi.string().required().invalid(' ', ''),
    logo: Joi.string().required().invalid(' ', ''),
    sector: Joi.string().required().invalid(' ', ''),
    iban: Joi.string().required().invalid(' ', ''),
    btwNummer: Joi.string().required().invalid(' ', ''),
    telefoonnummer: Joi.string().required().invalid(' ', ''),
    gebruikerSinds: Joi.string().required().invalid(' ', ''),
    idAdres: Joi.number().integer().positive()
  }
}

const deleteBedrijfById = async (ctx) => {
  bedrijfServer.deleteBedrijfById(Number(ctx.params.id));
  ctx.status = 204;
};
deleteBedrijfById.validationSheme={
  params: {
    id: Joi.number().integer().positive(),
  },
}

/**
 * Install Message routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/bedrijf',
  });

  router.get(
    '/',
    validate(getAllBedrijven.validationSheme),
    getAllBedrijven
);
  router.post(
    '/',
    validate(createBedrijf.validationSheme),
    createBedrijf
);
  router.get(
    '/:id',
    validate(getBedrijfById.validationSheme),
    getBedrijfById
);
  router.get(
    '/:id',
    validate(findBedrijfByName.validationSheme),
    findBedrijfByName
);
  router.put(
    '/:id',
    validate(updateBedrijfById.validationSheme),
    updateBedrijfById
  );
  router.delete(
    '/:id',
    validate(deleteBedrijfById.validationSheme),
    deleteBedrijfById
  );

  app.use(router.routes())
     .use(router.allowedMethods());
};
