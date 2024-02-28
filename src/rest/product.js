const KoaRouter = require("@koa/router");
const Joi = require("joi");
const validate = require("../core/validation");
const ServiceProducten = require("../service/product");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Role = require('../core/roles');

const getProducten = async (ctx) => {
  try {
    const producten = await ServiceProducten.getProducten();

    ctx.body = producten;
    ctx.status = 200;
  } catch (error) {
    ctx.body = { message: "Error while fetching producten" };
    ctx.status = 500;
  }
};

const getProductByID = async (ctx) => {
  ctx.body = await ServiceProducten.getProductByID(Number(ctx.params.id));
};

getProducten.validationScheme = {};

const createProducten = async (ctx) => {

  try {
    const { idLeverancier } = ctx.state.session;

    const { picture, prodName, unitprice, taxprice } = ctx.request.body;

    const createdProd = await ServiceProducten.createProducten(
      idLeverancier,
      picture,
      prodName,
      unitprice,
      taxprice
    );


    ctx.body = { product: createdProd };
    ctx.status = 200;
  } catch (error) {
    if (ctx.status === 403) {
      ctx.body = { message: "Permission denied" };
    } else {
      ctx.status = 500;
      ctx.body = { message: error };
    }
  }
};
createProducten.validationScheme = {
  body: {
    picture: Joi.string().required(),
    prodName: Joi.string().required(),
    unitprice: Joi.number().positive().required(),
    taxprice: Joi.number().positive().required(),
  },
};

const requireLeverancier = makeRequireRole(Role.LEVER);

/**
 * Install team routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const userRouter = new KoaRouter({
    prefix: "/producten",
  });
  // public
  userRouter.get("/", validate(getProducten.validationScheme), getProducten);
  userRouter.get("/:id", getProductByID);
  //private
  userRouter.post(
    "/",
    requireAuthentication,
    requireLeverancier,
    validate(createProducten.validationScheme),
    createProducten
  );

  router.use(userRouter.routes()).use(router.allowedMethods());
};
