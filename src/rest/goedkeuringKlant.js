const KoaRouter = require("@koa/router");
const Joi = require("joi");
const { requireAuthentication } = require("../core/auth");
const goedkeuringKlantService = require("../service/goedkeuringKlant");
const validate = require("../core/validation");
const { getLogger } = require("../core/logging");

const getLaatsteWijziging = async (ctx) => {
  try {
    ctx.body = await goedkeuringKlantService.getLaatsteWijziging(
      ctx.state.session
    );
    ctx.status = 200;
  } catch (error) {
    getLogger().error("Error occurred while fetching laatste wijziging", {
      error,
    });
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }
};
getLaatsteWijziging.validationSheme = null;

const getAllGoedkeuringenKlant = async (ctx) => {
  try {
    const goedkeuringen =
      await goedkeuringKlantService.getAllGoedkeuringenKlant(ctx.state.session);
    ctx.body = goedkeuringen;
    ctx.status = 200;
  } catch (error) {
    getLogger().error("Error occurred while fetching goedkeuringen for klant", {
      error,
    });
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }
};
getAllGoedkeuringenKlant.validationSheme = null;

const getGoedkeuringKlantById = async (ctx) => {
  try {
    const goedkeuring = await goedkeuringKlantService.getGoedkeuringKlantById(
      ctx.params.id,
      ctx.state.session
    );
    ctx.body = goedkeuring;
    ctx.status = 200;
  } catch (error) {
    getLogger().error(
      "Error occurred while fetching goedkeuring for klant by ID",
      { error }
    );
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }
};
getGoedkeuringKlantById.validationSheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const createGoedkeuringKlant = async (ctx) => {
  try {
    const {
      klantNummer,
      gebruikersnaam,
      email,
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
    const { idKlant } = ctx.state.session;

    const newGoedkeuringWijziging =
      await goedkeuringKlantService.createGoedkeuringKlant(
        {
          idKlant,
          klantNummer,
          gebruikersnaam,
          email,
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
        },
        ctx.state.session
      );
    ctx.body = newGoedkeuringWijziging;
    ctx.status = 201;
  } catch (error) {
    getLogger().error("Error occurred while creating goedkeuring for klant", {
      error,
    });
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }
};
createGoedkeuringKlant.validationSheme = {
  body: {
    klantNummer: Joi.string().max(255).required(),
    gebruikersnaam: Joi.string().max(50).required(),
    email: Joi.string().email().max(50).required(),
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
  },
};

const deleteGoedkeuringKlantById = async (ctx) => {
  try {
    await goedkeuringKlantService.deleteGoedkeuringKlantById(
      Number(ctx.params.id),
      ctx.state.session
    );
    ctx.status = 204;
  } catch (error) {
    getLogger().error(
      "Error occurred while deleting goedkeuring for klant by ID",
      { error }
    );
    ctx.status = 500;
    ctx.body = { error: "Internal Server Error" };
  }
};
deleteGoedkeuringKlantById.validationSheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

module.exports = (router) => {
  const goedkeuringKlantRouter = new KoaRouter({
    prefix: "/goedkeuringKlant",
  });

  goedkeuringKlantRouter.get(
    '/laatsteWijziging',
    requireAuthentication,
    validate(getLaatsteWijziging.validationSheme),
    getLaatsteWijziging
  );

  goedkeuringKlantRouter.get(
    "/",
    requireAuthentication,
    validate(getAllGoedkeuringenKlant.validationSheme),
    getAllGoedkeuringenKlant
  );
  goedkeuringKlantRouter.get(
    "/:id",
    requireAuthentication,
    validate(getGoedkeuringKlantById.validationSheme),
    getGoedkeuringKlantById
  );
  goedkeuringKlantRouter.post(
    "/",
    requireAuthentication,
    validate(createGoedkeuringKlant.validationSheme),
    createGoedkeuringKlant
  );
  goedkeuringKlantRouter.delete(
    "/:id",
    requireAuthentication,
    validate(deleteGoedkeuringKlantById.validationSheme),
    deleteGoedkeuringKlantById
  );

  router
    .use(goedkeuringKlantRouter.routes())
    .use(goedkeuringKlantRouter.allowedMethods());
};
