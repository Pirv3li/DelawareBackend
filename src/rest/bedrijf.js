const Router = require('@koa/router');
const Joi = require('joi');
const { requireAuthentication } = require('../core/auth'); 
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
    const {naam, logo, sector, iban, btwNummer, email, telefoonnummer, gebruikerSinds, idAdres} = ctx.request.body;
  const newBedrijf = await bedrijfServer.createBedrijf({
    naam: String(naam),
    logo: String(logo),
    sector: String(sector),
    iban: String(iban),
    btwNummer: String(btwNummer),
    email: String(email),
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
        email: Joi.string().required().invalid(' ', ''),
        telefoonnummer: Joi.string().required().invalid(' ', ''),
        gebruikerSinds: Joi.string().required().invalid(' ', ''),
        idAdres: Joi.number().integer().positive()
    }
}

const updateBedrijfById = async (ctx) => {
    const {naam, logo, sector, iban, btwNummer, email, telefoonnummer, gebruikerSinds, idAdres} = ctx.request.body;
  ctx.body = await bedrijfServer.updateBedrijfById(Number(ctx.params.id), {
    naam: String(naam),
    logo: String(logo),
    sector: String(sector),
    iban: String(iban),
    btwNummer: String(btwNummer),
    email: String(email),
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
    email: Joi.string().required().invalid(' ', ''),
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

const getBedrijfByKlantId = async (ctx) => {
  ctx.body = await bedrijfServer.getBedrijfByKlantId(Number(ctx.params.id));
}
getBedrijfByKlantId.validationSheme={
  params: {
    id: Joi.number().integer().positive(),
  },
}

const getBedrijfByLeverancierId = async (ctx) => {
  ctx.body = await bedrijfServer.getBedrijfByLeverancierId(Number(ctx.params.id));
}
getBedrijfByLeverancierId.validationSheme={
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
    requireAuthentication,
    validate(getAllBedrijven.validationSheme),
    getAllBedrijven
);
  router.post(
    '/',
    requireAuthentication,
    validate(createBedrijf.validationSheme),
    createBedrijf
);
  router.get(
    '/:id',
    requireAuthentication,
    validate(getBedrijfById.validationSheme),
    getBedrijfById
);
  router.get(
    '/:id',
    requireAuthentication,
    validate(findBedrijfByName.validationSheme),
    findBedrijfByName
);
  router.put(
    '/:id',
    requireAuthentication,
    validate(updateBedrijfById.validationSheme),
    updateBedrijfById
  );
  router.delete(
    '/:id',
    requireAuthentication,
    validate(deleteBedrijfById.validationSheme),
    deleteBedrijfById
  );
  router.get(
    '/klant/:id',
    requireAuthentication,
    validate(getBedrijfByKlantId.validationSheme),
    getBedrijfByKlantId
  );
  router.get(
    '/leverancier/:id',
    requireAuthentication,
    validate(getBedrijfByLeverancierId.validationSheme),
    getBedrijfByLeverancierId
  );

  app.use(router.routes())
     .use(router.allowedMethods());
};
