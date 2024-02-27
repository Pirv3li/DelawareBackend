const KoaRouter = require("@koa/router");
const Joi = require('joi');
const validate = require('../core/validation');
const ServiceProducten = require("../service/product");

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
getProducten.validationScheme = {};

const createProducten = async(ctx) => {
  try {
    const leverID = ctx.state.session.leverId;
    const {picture, prodName, unitprice, taxprice} = ctx.request.body;

    const createdProd = await ServiceProducten.createProducten(leverID, picture, prodName, unitprice, taxprice);
    
    ctx.body = {product: createdProd}
    ctx.status = 200
  } catch (error) {
    if (ctx.status === 403) {
      ctx.body = { message: "Permission denied" };
    } else {
      
    }
  }
}
createProducten.validationScheme = {
  body: {
    leverID: Joi.string().required(),
    picture: Joi.string().required(),
    prodName: Joi.string().required(),
    unitprice: Joi.number().positive().required(),
    taxprice: Joi.number().positive().required() 
  },
};

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

  //private
  userRouter.post("/", validate(createProducten.validationScheme), createProducten)

  router.use(userRouter.routes()).use(router.allowedMethods());
};
