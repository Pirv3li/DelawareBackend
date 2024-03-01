const KoaRouter = require("@koa/router");
const Joi = require("joi");
const validate = require("../core/validation");
const ServiceProducten = require("../service/product");
const {
  requireAuthentication,
  makeRequireRole
} = require("../core/auth");
const Role = require("../core/roles");

const getProducten = async (ctx) => {
  try {
    const producten = await ServiceProducten.getProducten();

    ctx.body = producten;
    ctx.status = 200;
  } catch (error) {
    ctx.body = {
      message: "Error while fetching producten"
    };
    ctx.status = 500;
  }
};

const getProductByID = async (ctx) => {
  ctx.body = await ServiceProducten.getProductByID(Number(ctx.params.id));
};

getProducten.validationScheme = {};

const createProducten = async (ctx) => {
  try {
    const {
      idLeverancier
    } = ctx.state.session;

    const {
      foto,
      naam,
      eenheidsprijs,
      btwtarief,
      aantal,
      gewicht,
      beschrijving,
    } = ctx.request.body;

    const createdProd = await ServiceProducten.createProducten(
      idLeverancier,
      foto,
      naam,
      eenheidsprijs,
      btwtarief,
      aantal,
      gewicht,
      beschrijving
    );

    ctx.body = createdProd;
    ctx.status = 200;
  } catch (error) {
    if (ctx.status === 403) {
      ctx.body = {
        message: "Permission denied"
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        message: error
      };
    }
  }
};
createProducten.validationScheme = {
  body: {
    foto: Joi.string().required(),
    naam: Joi.string().required(),
    eenheidsprijs: Joi.number().positive().required(),
    btwtarief: Joi.number().positive().required(),
    aantal: Joi.number().integer().required(),
    gewicht: Joi.number().precision(2).positive().required(),
    beschrijving: Joi.string().max(255),
  },
};

const updateProduct = async (ctx) => {
  const {
    idLeverancier
  } = ctx.state.session;
  const idProduct = ctx.params.id;
  const productUpdates = ctx.request.body;

  try {
    const updatedProd = await ServiceProducten.updateProduct(idProduct, idLeverancier, productUpdates);

    ctx.status = 200;
    ctx.body = updatedProd;
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: "Error updating product"
    };
  }
};


updateProduct.validationScheme = {
  params: {
    id: Joi.number().integer().required(),
  },
  body: {
    idLeverancier: Joi.number().required(),
    foto: Joi.string().optional(),
    naam: Joi.string().optional(),
    eenheidsprijs: Joi.number().positive().optional(),
    btwtarief: Joi.number().positive().optional(),
    aantal: Joi.number().integer().optional(),
    gewicht: Joi.number().precision(2).positive().optional(),
    beschrijving: Joi.string().max(255).optional(),
  },
};


const requireLeverancier = makeRequireRole(Role.LEVER);

/**
 * Install team routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const ProductRouter = new KoaRouter({
    prefix: "/producten",
  });
  // public
  ProductRouter.get("/", validate(getProducten.validationScheme), getProducten);
  ProductRouter.get("/:id", getProductByID);
  //private
  ProductRouter.post(
    "/",
    requireAuthentication,
    requireLeverancier,
    validate(createProducten.validationScheme),
    createProducten
  );

  ProductRouter.put(
    "/:id",
    requireAuthentication,
    requireLeverancier,
    validate(updateProduct.validationScheme),
    updateProduct
  );

  router.use(ProductRouter.routes()).use(router.allowedMethods());
};