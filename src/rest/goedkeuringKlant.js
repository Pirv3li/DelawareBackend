const KoaRouter = require("@koa/router");
const Joi = require('joi');
const { requireAuthentication } = require('../core/auth'); 
const goedkeuringKlantService = require('../service/goedkeuringKlant');
const validate = require('../core/validation')

// De user wordt doorgegeven naar de service laag omdat er daar gecheckt wordt of deze een admin is via het doorgegeven token
// zodat er in de service-laag gecontroleerd kan worden of de ingelogde gebruiker deze requests wel mag uitvoeren
// nu staat het nog even in commentaar

const getAllGoedkeuringenKlant = async (ctx) => {
  ctx.body = await goedkeuringKlantService.getAllGoedkeuringenKlant(ctx.state.session.roles);
};
getAllGoedkeuringenKlant.validationSheme = null

const getGoedkeuringKlantById = async (ctx) => {
  ctx.body = await goedkeuringKlantService.getGoedkeuringKlantById(Number(ctx.params.id), ctx.state.session.roles);
};
getGoedkeuringKlantById.validationSheme={
  params: {
    id: Joi.number()
      .integer()
      .positive()
  }
}

const createGoedkeuringKlant = async (ctx) => {
  const { klantNummer, gebruikersnaam, email, password_hash, isActief, roles, idBedrijf } = ctx.request.body;
  const { idKlant } = ctx.state.session;
  const newGoedkeuringWijziging = await goedkeuringKlantService.createGoedkeuringKlant({ klantNummer, gebruikersnaam, email, password_hash, isActief, roles, idBedrijf, idKlant }, ctx.state.session.roles);
  ctx.body = newGoedkeuringWijziging;
  ctx.status = 201;
};
createGoedkeuringKlant.validationSheme = {
  body: {
    klantNummer: Joi.string().max(255).required(),
    gebruikersnaam: Joi.string().max(50).required(),
    email: Joi.string().email().max(50).required(),
    password_hash: Joi.string().required(),
    isActief: Joi.boolean().required(),
    roles: Joi.array().items(Joi.string()).required(),
    idBedrijf: Joi.number().integer().positive().required(),
  }
}

const deleteGoedkeuringKlantById = async (ctx) => {
  await goedkeuringKlantService.deleteGoedkeuringKlantById(Number(ctx.params.id), ctx.state.session.roles);
  ctx.status = 204;
};
deleteGoedkeuringKlantById.validationSheme={
  params: {
    id: Joi.number().integer().positive(),
  },
}

module.exports = (router) => {
  const goedkeuringKlantRouter = new KoaRouter({
    prefix: '/goedkeuringKlant',
  });

  goedkeuringKlantRouter.get(
    '/',
    requireAuthentication,
    validate(getAllGoedkeuringenKlant.validationSheme),
    getAllGoedkeuringenKlant
  );
  goedkeuringKlantRouter.get(
    '/:id',
    requireAuthentication,
    validate(getGoedkeuringKlantById.validationSheme),
    getGoedkeuringKlantById
  );
  goedkeuringKlantRouter.post(
    '/',
    requireAuthentication,
    validate(createGoedkeuringKlant.validationSheme),
    createGoedkeuringKlant
  );
  goedkeuringKlantRouter.delete(
    '/:id',
    requireAuthentication,
    validate(deleteGoedkeuringKlantById.validationSheme),
    deleteGoedkeuringKlantById
  );

  router.use(goedkeuringKlantRouter.routes()).use(goedkeuringKlantRouter.allowedMethods());
};