const KoaRouter = require("@koa/router");
const Joi = require('joi');
const { requireAuthentication } = require('../core/auth'); 
const goedkeuringLeverancierService = require('../service/goedkeuringLeverancier');
const validate = require('../core/validation');
const { getLogger } = require("../core/logging");

const getLaatsteWijziging = async (ctx) => {
  try {
    ctx.body = await goedkeuringLeverancierService.getLaatsteWijziging(ctx.state.session);
    ctx.status = 200;
  } catch (error) {
    getLogger().error('Error occurred while fetching laatste wijziging', { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
getLaatsteWijziging.validationSheme = null


const getAllGoedkeuringenLeverancier = async (ctx) => {
  try {
    ctx.body = await goedkeuringLeverancierService.getAllGoedkeuringenLeverancier(ctx.state.session);
    ctx.status = 200;
  } catch (error) {
    getLogger().error('Error occurred while fetching all goedkeuringen for leverancier', { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
getAllGoedkeuringenLeverancier.validationSheme = null

const getGoedkeuringLeverancierById = async (ctx) => {
  try {
    ctx.body = await goedkeuringLeverancierService.getGoedkeuringLeverancierById(ctx.params.id, ctx.state.session);
    ctx.status = 200;
  } catch (error) {
    getLogger().error('Error occurred while fetching goedkeuring for leverancier by ID', { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
getGoedkeuringLeverancierById.validationSheme={
  params: {
    id: Joi.number()
      .integer()
      .positive()
  }
}

const createGoedkeuringLeverancier = async (ctx) => {
  try {
    const {
      leverancierNummer,
      gebruikersnaam,
      email,
      password,
      isActief,
      roles,
      iban,
      btwNummer,
      telefoonnummer,
      sector,
      straat,
      nummer,
      stad,
      postcode,
    } = ctx.request.body;
    const { idLeverancier } = ctx.state.session;
    const newGoedkeuringWijziging = await goedkeuringLeverancierService.createGoedkeuringLeverancier({
      idLeverancier,
      leverancierNummer,
      gebruikersnaam,
      email,
      password,
      isActief,
      roles,
      iban,
      btwNummer,
      telefoonnummer,
      sector,
      straat,
      nummer,
      stad,
      postcode,
    }, ctx.state.session);
    ctx.body = newGoedkeuringWijziging;
    ctx.status = 201;
  } catch (error) {
    getLogger().error('Error occurred while creating goedkeuring for leverancier', { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
createGoedkeuringLeverancier.validationSheme = {
  body: {
    leverancierNummer: Joi.string().max(255).required(),
    gebruikersnaam: Joi.string().max(50).required(),
    email: Joi.string().email().max(50).required(),
    password: Joi.string().required(),
    isActief: Joi.boolean().required(),
    roles: Joi.array().items(Joi.string()).required(),
    iban: Joi.string().max(255).required(),
    btwNummer: Joi.string().max(255).required(),
    telefoonnummer: Joi.string().max(255).required(),
    sector: Joi.string().max(255).required(),
    straat: Joi.string().max(255).required(),
    nummer: Joi.string().max(255).required(),
    stad: Joi.string().max(255).required(),
    postcode: Joi.string().max(255).required(),
  }
}

const deleteGoedkeuringLeverancierById = async (ctx) => {
  try {
    await goedkeuringLeverancierService.deleteGoedkeuringLeverancierById(Number(ctx.params.id), ctx.state.session);
    ctx.status = 204;
  } catch (error) {
    getLogger().error('Error occurred while deleting goedkeuring for leverancier by ID', { error });
    ctx.status = 500;
    ctx.body = { error: 'Internal Server Error' };
  }
};
deleteGoedkeuringLeverancierById.validationSheme={
  params: {
    id: Joi.number().integer().positive(),
  },
}

module.exports = (router) => {
  const goedkeuringLeverancierRouter = new KoaRouter({
    prefix: '/goedkeuringLeverancier',
  });

  goedkeuringLeverancierRouter.get(
    '/laatsteWijziging',
    requireAuthentication,
    validate(getLaatsteWijziging.validationSheme),
    getLaatsteWijziging
  );

  goedkeuringLeverancierRouter.get(
    '/',
    requireAuthentication,
    validate(getAllGoedkeuringenLeverancier.validationSheme),
    getAllGoedkeuringenLeverancier
  );
  goedkeuringLeverancierRouter.get(
    '/:id',
    requireAuthentication,
    validate(getGoedkeuringLeverancierById.validationSheme),
    getGoedkeuringLeverancierById
  );
  goedkeuringLeverancierRouter.post(
    '/',
    requireAuthentication,
    validate(createGoedkeuringLeverancier.validationSheme),
    createGoedkeuringLeverancier
  );
  goedkeuringLeverancierRouter.delete(
    '/:id',
    requireAuthentication,
    validate(deleteGoedkeuringLeverancierById.validationSheme),
    deleteGoedkeuringLeverancierById
  );

  router.use(goedkeuringLeverancierRouter.routes()).use(goedkeuringLeverancierRouter.allowedMethods());
};