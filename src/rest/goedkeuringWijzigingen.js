const KoaRouter = require("@koa/router");
const Joi = require('joi');
const { requireAuthentication } = require('../core/auth'); 
const goedkeuringWijzigingenService = require('../service/goedkeuringWijzigingen');
const validate = require('../core/validation')

// De user wordt doorgegeven naar de service laag omdat er daar gecheckt wordt of deze een admin is via het doorgegeven token
// zodat er in de service-laag gecontroleerd kan worden of de ingelogde gebruiker deze requests wel mag uitvoeren
// nu staat het nog even in commentaar

const getAllGoedkeuringWijzigingen = async (ctx) => {
  ctx.body = await goedkeuringWijzigingenService.getAllGoedkeuringWijzigingen(/*ctx.state.user*/);
};
getAllGoedkeuringWijzigingen.validationSheme = null

const getGoedkeuringWijzigingById = async (ctx) => {
  ctx.body = await goedkeuringWijzigingenService.getGoedkeuringWijzigingById(Number(ctx.params.id)/*, ctx.state.user*/);
};
getGoedkeuringWijzigingById.validationSheme={
  params: {
    id: Joi.number()
      .integer()
      .positive()
  }
}

const createGoedkeuringWijziging = async (ctx) => {
  const { gebruikerNummer, gebruikersnaam, email, password_hash, isActief, roles, idBedrijf } = ctx.request.body;
  const newGoedkeuringWijziging = await goedkeuringWijzigingenService.createGoedkeuringWijziging({ gebruikerNummer, gebruikersnaam, email, password_hash, isActief, roles, idBedrijf }/*, ctx.state.user*/);
  ctx.body = newGoedkeuringWijziging;
  ctx.status = 201;
};
createGoedkeuringWijziging.validationSheme = {
  body: {
    gebruikerNummer: Joi.string().max(255).required(),
    gebruikersnaam: Joi.string().max(50).required(),
    email: Joi.string().email().max(50).required(),
    password_hash: Joi.string().required(),
    isActief: Joi.boolean().required(),
    roles: Joi.array().items(Joi.string()).required(),
    idBedrijf: Joi.number().integer().positive().required()
  }
}

const deleteGoedkeuringWijzigingById = async (ctx) => {
  await goedkeuringWijzigingenService.deleteGoedkeuringWijzigingById(Number(ctx.params.id)/*, ctx.state.user*/);
  ctx.status = 204;
};
deleteGoedkeuringWijzigingById.validationSheme={
  params: {
    id: Joi.number().integer().positive(),
  },
}

module.exports = (router) => {
  const goedkeuringWijzigingenRouter = new KoaRouter({
    prefix: '/goedkeuringWijzigingen',
  });

  goedkeuringWijzigingenRouter.get(
    '/',
    requireAuthentication,
    validate(getAllGoedkeuringWijzigingen.validationSheme),
    getAllGoedkeuringWijzigingen
  );
  goedkeuringWijzigingenRouter.get(
    '/:id',
    requireAuthentication,
    validate(getGoedkeuringWijzigingById.validationSheme),
    getGoedkeuringWijzigingById
  );
  goedkeuringWijzigingenRouter.post(
    '/',
    requireAuthentication,
    validate(createGoedkeuringWijziging.validationSheme),
    createGoedkeuringWijziging
  );
  goedkeuringWijzigingenRouter.delete(
    '/:id',
    requireAuthentication,
    validate(deleteGoedkeuringWijzigingById.validationSheme),
    deleteGoedkeuringWijzigingById
  );

  router.use(goedkeuringWijzigingenRouter.routes()).use(goedkeuringWijzigingenRouter.allowedMethods());
};