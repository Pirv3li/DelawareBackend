const KoaRouter = require("@koa/router");
const Joi = require('joi');
const { requireAuthentication } = require('../core/auth'); 
const goedkeuringLeverancierService = require('../service/goedkeuringLeverancier');
const validate = require('../core/validation');
const { getLogger } = require("../core/logging");

// De user wordt doorgegeven naar de service laag omdat er daar gecheckt wordt of deze een admin is via het doorgegeven token
// zodat er in de service-laag gecontroleerd kan worden of de ingelogde gebruiker deze requests wel mag uitvoeren
// nu staat het nog even in commentaar

const getAllGoedkeuringenLeverancier = async (ctx) => {
  try {
    ctx.body = await goedkeuringLeverancierService.getAllGoedkeuringenLeverancier(ctx.state.session.roles);
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
    ctx.body = await goedkeuringLeverancierService.getGoedkeuringLeverancierById(ctx.params.id, ctx.state.session.roles);
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
    const { leverancierNummer, gebruikersnaam, email, password_hash, isActief, roles, idBedrijf } = ctx.request.body;
    const { idLeverancier } = ctx.state.session;
    const newGoedkeuringWijziging = await goedkeuringLeverancierService.createGoedkeuringLeverancier({ leverancierNummer, gebruikersnaam, email, password_hash, isActief, roles, idBedrijf, idLeverancier }, ctx.state.session.roles);
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
    password_hash: Joi.string().required(),
    isActief: Joi.boolean().required(),
    roles: Joi.array().items(Joi.string()).required(),
    idBedrijf: Joi.number().integer().positive().required(),
  }
}

const deleteGoedkeuringLeverancierById = async (ctx) => {
  try {
    await goedkeuringLeverancierService.deleteGoedkeuringLeverancierById(Number(ctx.params.id), ctx.state.session.roles);
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