const KoaRouter = require("@koa/router");
const validate = require("../core/validation");
const userService = require("../service/users");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Role = require("../core/roles");
const Joi = require("joi");

const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  const token = await userService.loginLeverancier(username, password);
  ctx.body = token;
};

login.validationScheme = {
  body: {
    username: Joi.string(),
    password: Joi.string(),
  },
};

const getLeverancier = async (ctx) => {
  try {
    const { idLeverancier } = ctx.state.session;
    const leverancier = await userService.getLeverancierById(idLeverancier);

    if (leverancier) {
      ctx.status = 200;
      ctx.body = leverancier;
    } else {
      ctx.status = 404;
      ctx.body = { message: "leverancier not found" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error fetching leverancier data" };
  }
};

getLeverancier.validationScheme = null;

const getLeverancierById = async (ctx) => {
  try {
    const { id } = ctx.params;
    const leverancier = await userService.getLeverancierById(id);

    if (leverancier) {
      ctx.status = 200;
      ctx.body = leverancier;
    } else {
      ctx.status = 404;
      ctx.body = { message: "leverancier not found" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error fetching leverancier data" };
  }
};

getLeverancierById.validationScheme = {
  params: {
    id: Joi.number().required(),
  },
};

const updateLeverancier = async (ctx) => {
  try{
  const {idLeverancier} = ctx.state.session;
  const body = ctx.request.body;
  const updateLeverancier = await userService.updateLeverancier(idLeverancier,body);
  if(updateLeverancier){
    ctx.status = 200;
    ctx.body = updateLeverancier;
  }
  else {
    ctx.status = 404;
  }
  }catch(error){
    ctx.status=500;
  }
};
updateLeverancier.validationScheme = {
  body: {
    username: Joi.string().optional(),
    password: Joi.string().optional(),
  }
};


const adminRole = makeRequireRole(Role.ADMIN);

/**
 * Install team routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const userRouter = new KoaRouter({
    prefix: "/leverancier",
  });
  // public
  userRouter.post("/login", validate(login.validationScheme), login);
  userRouter.get(
    "/",
    requireAuthentication,
    validate(getLeverancier.validationScheme),
    getLeverancier
  );
  userRouter.put(
    "/",
    requireAuthentication,
    validate(updateLeverancier.validationScheme),
    updateLeverancier
  );
  userRouter.get(
    "/:id",
    requireAuthentication,
    adminRole,
    validate(getLeverancierById.validationScheme),
    getLeverancierById
  );
  router.use(userRouter.routes()).use(router.allowedMethods());
};
