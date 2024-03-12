const KoaRouter = require("@koa/router");
const Joi = require("joi");
const validate = require("../core/validation");
const ServiceProducten = require("../service/product");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const Role = require("../core/roles");

const getProducten = async (ctx) => {
  try {
    const producten = await ServiceProducten.getProducten();

    ctx.body = producten;
    ctx.status = 200;
  } catch (error) {
    ctx.body = {
      message: "Error while fetching producten",
    };
    //ctx.status = 500;
  }
};

const getProductenLimit = async (ctx) => {

  const {begin} = ctx.request.body;
  try {
    const producten = await ServiceProducten.getProductenLimit(begin);

    ctx.body = producten;
    ctx.status = 200;
  } catch (error) {
    ctx.body = {
      message: "Error while fetching producten limit",
    };
    //ctx.status = 500;
  }
};

getProductenLimit.validationScheme = {
  body: {
    begin: Joi.number().positive(),
  }
};

const getProductByID = async (ctx) => {
  ctx.body = await ServiceProducten.getProductByID(Number(ctx.params.id));
};

getProducten.validationScheme = {};

const createProducten = async (ctx) => {
  try {
    const { idLeverancier } = ctx.state.session;

    const {
      foto,
      naam,
      eenheidsprijs,
      btwtarief,
      aantal,
      gewicht,
      categorie,
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
      categorie,
      beschrijving
    );

    ctx.body = createdProd;
    ctx.status = 200;
  } catch (error) {
    if (ctx.status === 403) {
      ctx.body = {
        message: "Permission denied",
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        message: error,
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
    categorie: Joi.string().required(),
    beschrijving: Joi.string().max(255),
  },
};

const updateProduct = async (ctx) => {
  const { idLeverancier } = ctx.state.session;
  const idProduct = ctx.params.id;
  const productUpdates = ctx.request.body;

  try {
    const updatedProd = await ServiceProducten.updateProduct(
      idProduct,
      idLeverancier,
      productUpdates
    );
    ctx.status = 200;
    ctx.body = updatedProd;
  } catch (error) {
    if ((error.code = "NOT_FOUND")) {
      ctx.status = 404;
    }
    ctx.body = {
      message: error.message,
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
    categorie: Joi.string().optional(),
    beschrijving: Joi.string().max(255).optional(),
  },
};

const deleteProduct = async (ctx) => {
  try {
    const { idLeverancier } = ctx.state.session;
    const idProduct = ctx.params.id;

    const deletedProduct = await ServiceProducten.deleteProduct(
      idLeverancier,
      idProduct
    );
    if (deletedProduct) {
      ctx.status = 200;
      ctx.body = { message: "Product deleted" };
    }
  } catch (error) {
    if ((error.code = "NOT_FOUND")) {
      ctx.status = 404;
    } else {
      ctx.status = 500;
    }
    ctx.body = {
      message: "Error deleting product",
    };
  }
};

deleteProduct.validationScheme = {
  params: {
    id: Joi.number().integer().required(),
  },
};
const getDistinctCategories = async (ctx) => {
  try {
    const categories = await ServiceProducten.getDistinctCategories();
    ctx.body = categories;
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      message: "Error fetching categories",
    };
  }
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
  ProductRouter.get("/categories", getDistinctCategories);
  ProductRouter.get("/:id", getProductByID);
  ProductRouter.post("/begin",validate(getProductenLimit.validationScheme), getProductenLimit);

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

  ProductRouter.delete(
    "/:id",
    requireAuthentication,
    requireLeverancier,
    validate(deleteProduct.validationScheme),
    deleteProduct
  );

  router.use(ProductRouter.routes()).use(router.allowedMethods());
};
