const Router = require("@koa/router");
const Joi = require("joi");
const { requireAuthentication } = require("../core/auth");
const bedrijfServer = require("../service/bedrijf");
const validate = require("../core/validation");
const { getLogger } = require('../core/logging')

const getAllBedrijven = async (ctx) => {
  try {
    const bedrijven = await bedrijfServer.getAllBedrijven();
    
    ctx.body = bedrijven;
    ctx.status = 200;
    getLogger().info('All bedrijven fetched successfully');
  } catch (error) {
    console.log(error);
    getLogger().error('Error occurred while fetching bedrijven', { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
getAllBedrijven.validationSheme = null;

const getBedrijfById = async (ctx) => {
  try {
    const bedrijf = await bedrijfServer.getBedrijfById(ctx.params.id);
    ctx.body = bedrijf;
    ctx.status = 200;
    getLogger().info(`Bedrijf with ID ${ctx.params.id} fetched successfully`);
  } catch (error) {
    getLogger().error(`Error occurred while fetching bedrijf with ID ${ctx.params.id}`, { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
getBedrijfById.validationSheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const findBedrijfByName = async (ctx) => {
  try {
    const { naam } = ctx.request.body;
    const bedrijf = await bedrijfServer.findBedrijfByName(naam);
    ctx.body = bedrijf;
    ctx.status = 200;
    getLogger().info(`Bedrijf with name "${naam}" found successfully`);
  } catch (error) {
    getLogger().error('Error occurred while finding bedrijf by name', { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
findBedrijfByName.validationSheme = {
  body: {
    naam: Joi.string(),
  },
};
const createBedrijf = async (ctx) => {
  try {
    const {
      naam,
      logo,
      sector,
      iban,
      btwNummer,
      email,
      telefoonnummer,
      gebruikerSinds,
      idAdres,
    } = ctx.request.body;

    const newBedrijf = await bedrijfServer.createBedrijf({
      naam,
      logo,
      sector,
      iban,
      btwNummer,
      email,
      telefoonnummer,
      gebruikerSinds,
      idAdres,
    });
    ctx.body = newBedrijf;
    ctx.status = 201;
    getLogger().info('New bedrijf created successfully', { newBedrijf });
  } catch (error) {
    getLogger().error('Error occurred while creating bedrijf', { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
createBedrijf.validationSheme = {
  body: {
    naam: Joi.string().required().invalid(" ", ""),
    logo: Joi.string().required().invalid(" ", ""),
    sector: Joi.string().required().invalid(" ", ""),
    iban: Joi.string().required().invalid(" ", ""),
    btwNummer: Joi.string().required().invalid(" ", ""),
    email: Joi.string().required().invalid(" ", ""),
    telefoonnummer: Joi.string().required().invalid(" ", ""),
    gebruikerSinds: Joi.string().required().invalid(" ", ""),
    idAdres: Joi.number().integer().positive(),
  },
};

const updateBedrijfById = async (ctx) => {
  try {
    const bedrijfUpdates = ctx.request.body;
    const { idLeverancier, idKlant } = ctx.state.session;
    const idBedrijf = ctx.params.id;

    const bedrijf = await bedrijfServer.updateBedrijfById(
      idLeverancier,
      idKlant,
      idBedrijf,
      bedrijfUpdates
    );
    ctx.body = bedrijf;
    ctx.status = 200;
    getLogger().info(`Bedrijf with ID ${idBedrijf} updated successfully`, { bedrijf });
  } catch (error) {
    getLogger().error(`Error occurred while updating bedrijf with ID ${ctx.params.id}`, { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
updateBedrijfById.validationSheme = {
  params: {
    id: Joi.number().integer().positive().required(),
  },
  body: {
    naam: Joi.string().optional(),
    logo: Joi.string().optional(),
    sector: Joi.string().optional(),
    iban: Joi.string().optional(),
    btwNummer: Joi.string().optional(),
    email: Joi.string().optional(),
    telefoonnummer: Joi.number().optional(),
    adres: Joi.object()
      .keys({
        straat: Joi.string().optional(),
        stad: Joi.string().optional(),
        nummer: Joi.number().optional(),
        postcode: Joi.number().optional(),
      })
      .optional()
      .when(
        Joi.object({
          straat: Joi.string().invalid("").required(),
          stad: Joi.string().invalid("").required(),
          nummer: Joi.number().required(),
          postcode: Joi.number().required(),
        }),
        {
          then: Joi.object({
            straat: Joi.string().required(),
            stad: Joi.string().required(),
            nummer: Joi.number().required(),
            postcode: Joi.number().required(),
          }),
          otherwise: Joi.object({
            straat: Joi.string().optional(),
            stad: Joi.string().optional(),
            nummer: Joi.number().optional(),
            postcode: Joi.number().optional(),
          }),
        }
      ),
  },
};

const deleteBedrijfById = async (ctx) => {
  try {
    await bedrijfServer.deleteBedrijfById(Number(ctx.params.id));
    ctx.status = 204;
    getLogger().info(`Bedrijf with ID ${ctx.params.id} deleted successfully`);
  } catch (error) {
    getLogger().error(`Error occurred while deleting bedrijf with ID ${ctx.params.id}`, { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
deleteBedrijfById.validationSheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const getBedrijfByKlantId = async (ctx) => {
  try {
    const bedrijf = await bedrijfServer.getBedrijfByKlantId(Number(ctx.params.id));
    ctx.body = bedrijf;
    ctx.status = 200;
  } catch (error) {
    getLogger().error(`Error occurred while fetching bedrijf by klant ID ${ctx.params.id}`, { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
getBedrijfByKlantId.validationSheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const getBedrijfByLeverancierId = async (ctx) => {
  try {
    const bedrijf = await bedrijfServer.getBedrijfByLeverancierId(ctx.params.id);
    ctx.body = bedrijf;
    ctx.status = 200;
  } catch (error) {
    getLogger().error(`Error occurred while fetching bedrijf by leverancier ID ${ctx.params.id}`, { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
getBedrijfByLeverancierId.validationSheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

/**
 * Install Message routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: "/bedrijf",
  });

  router.get(
    "/",
    requireAuthentication,
    validate(getAllBedrijven.validationSheme),
    getAllBedrijven
  );
  router.post(
    "/",
    requireAuthentication,
    validate(createBedrijf.validationSheme),
    createBedrijf
  );
  router.get(
    "/:id",
    requireAuthentication,
    validate(getBedrijfById.validationSheme),
    getBedrijfById
  );
  router.get(
    "/:id",
    requireAuthentication,
    validate(findBedrijfByName.validationSheme),
    findBedrijfByName
  );
  router.put(
    "/:id",
    requireAuthentication,
    validate(updateBedrijfById.validationSheme),
    updateBedrijfById
  );
  router.delete(
    "/:id",
    requireAuthentication,
    validate(deleteBedrijfById.validationSheme),
    deleteBedrijfById
  );
  router.get(
    "/klant/:id",
    requireAuthentication,
    validate(getBedrijfByKlantId.validationSheme),
    getBedrijfByKlantId
  );
  router.get(
    "/leverancier/:id",
    requireAuthentication,
    validate(getBedrijfByLeverancierId.validationSheme),
    getBedrijfByLeverancierId
  );

  app.use(router.routes()).use(router.allowedMethods());
};
