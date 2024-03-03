const KoaRouter = require("@koa/router");
const validate = require("../core/validation");
const userService = require("../service/users");
const Joi = require("joi");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Role = require("../core/roles");

const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  const token = await userService.loginKlant(username, password);
  ctx.body = token;
};
login.validationScheme = {
  body: {
    username: Joi.string(),
    password: Joi.string(),
  },
};

const getKlant = async (ctx) => {
  try {
    const { idKlant } = ctx.state.session;
    const klant = await userService.getKlantById(idKlant);
    console.log(klant);
    if (klant) {
      ctx.status = 200;
      ctx.body = klant;
    } else {
      ctx.status = 404;
      ctx.body = { message: "Klant not found" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error fetching klant data" };
  }
};
getKlant.validationScheme = null;

const getKlantById = async (ctx) => {
  try {
    const { id } = ctx.params;
    const klant = await userService.getKlantById(id);

    if (klant) {
      ctx.status = 200;
      ctx.body = klant;
    } else {
      ctx.status = 404;
      ctx.body = { message: "klant not found" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Error fetching klant data:" + error.message };
  }
};

getKlantById.validationScheme = {
  params: {
    id: Joi.number().required(),
  },
};

const updateKlant = async (ctx) => {
  try{
  const {idKlant} = ctx.state.session;
  const body = ctx.request.body;
  const updateKlant = await userService.updateKlant(idKlant,body);
  if(updateKlant){
    ctx.status = 200;
    ctx.body = updateKlant;
  }
  else {
    ctx.status = 404;
  }
  }catch(error){
    ctx.status=500;
  }
}

updateKlant.validationScheme = {
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
    prefix: "/klant",
  });
  // public
  userRouter.post("/login", validate(login.validationScheme), login);
  userRouter.get(
    "/",
    requireAuthentication,
    validate(getKlant.validationScheme),
    getKlant
  );
  userRouter.put(
    "/",
    requireAuthentication,
    validate(updateKlant.validationScheme),
    updateKlant
  );
  userRouter.get(
    "/:id",
    requireAuthentication,
    adminRole,
    validate(getKlantById.validationScheme),
    getKlantById
  );

  router.use(userRouter.routes()).use(router.allowedMethods());
};
