const KoaRouter = require("@koa/router");
const Joi = require("joi");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const orderService = require("../service/order");
const validate = require("../core/validation");
const Role = require("../core/roles");
const ServiceError = require("../core/serviceError");

const getOrderById = async (ctx) => {
  try {
    const orderId = ctx.params.id;
    const order = await orderService.getOrderById(orderId);
    // Check als user authorized is
    if (
      order.idKlant !== ctx.state.session.idKlant &&
      order.idLeverancier !== ctx.state.session.idLeverancier
    ) {
      ctx.status = 403;
      ctx.body = { message: "Permission denied" };
      return;
    }

    ctx.body = order;
  } catch (error) {
    ctx.status = error.status;
    ctx.body = { message: error.message };
  }
};

getOrderById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const createOrder = async (ctx) => {
  const idKlant = ctx.state.session.idKlant;
  const {
    idLeverancier,
    datum,
    orderStatus,
    betalingStatus,
    totaalPrijs,
    adres,
    products,
  } = ctx.request.body;
  try {
    // request creer order
    const newOrder = await orderService.createOrder(idKlant, {
      idLeverancier,
      datum: new Date(datum),
      orderStatus,
      betalingStatus,
      totaalPrijs,
      adres,
      products,
    });

    //als succes, return orderID
    ctx.body = newOrder;
    ctx.status = 201;
  } catch (error) {
    if (error.status === 403) {
      ctx.body = { message: "Permission denied" };
    }
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
};

createOrder.validationScheme = {
  body: {
    idLeverancier: Joi.number().positive().required(),
    datum: Joi.date().required(),
    orderStatus: Joi.string().required(),
    betalingStatus: Joi.string().required(),
    totaalPrijs: Joi.number().positive().required(),
    adres: Joi.object().keys({
      straat: Joi.string().required(),
      stad: Joi.string().required(),
      nummer: Joi.string().required(),
      postcode: Joi.string().required(),
    }),
    products: Joi.array()
      .items(
        Joi.object().keys({
          eenheidsprijs: Joi.number().required(),
          aantal: Joi.number().required(),
          idProduct: Joi.number().required(),
        })
      )
      .required(),
  },
};

const updateOrderById = async (ctx) => {
  const { orderStatus, betalingStatus } = ctx.request.body;

  const idKlant = ctx.state.session.idKlant;
  const idLeverancier = ctx.state.session.idLeverancier;
  let idUser;

  let order;

  try {
    order = await orderService.getOrderById(ctx.params.id); // Fetch order inside try block
  } catch (error) {
    ctx.status = 404;
    ctx.body = { message: "Order not found" };
    return;
  }

  // Rest of your code for processing the order and updating fields
  let updateFields = {};

  if (order.idKlant === idKlant) {
    idUser = idKlant;
    updateFields = { betalingStatus: betalingStatus };
    if (orderStatus !== undefined) {
      ctx.status = 403;
      ctx.body = { message: "Klant cannot update orderStatus" };
      return;
    }
  } else if (order.idLeverancier === idLeverancier) {
    idUser = idLeverancier;
    updateFields = { orderStatus: orderStatus, betalingStatus: betalingStatus };
  } else {
    ctx.status = 403;
    ctx.body = { message: "Permission denied" };
    return;
  }

  try {
    // update order met juiste gegevens
    ctx.body = await orderService.updateOrderById(
      Number(ctx.params.id),
      updateFields
    );
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "Internal Server Error" };
  }
};
updateOrderById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    orderStatus: Joi.string().optional(),
    betalingStatus: Joi.string().optional(),
  },
};


const getOrderByKlantId = async (ctx) => {
  const idKlant = ctx.state.session.idLeverancier;
  const  begin = parseInt(ctx.params.id);
  ctx.body = await orderService.getOrderByKlantId(idKlant,begin);
};

getOrderByKlantId.validationScheme = {};

const getOrderByLeverancierId = async (ctx) => {
  const idLeverancier = ctx.state.session.idLeverancier;
  const  begin = parseInt(ctx.params.id);
  ctx.body = await orderService.getOrderByLeverancierId(idLeverancier,begin);
 
};

getOrderByLeverancierId.validationSheme=null

const requireLeverancier = makeRequireRole(Role.LEVER);
const requireKlant = makeRequireRole(Role.KLANT);

/**
 * Install order routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const orderRouter = new KoaRouter({
    prefix: '/order',
  });

 
  orderRouter.post(
    '/',
    requireAuthentication,
    validate(createOrder.validationSheme),
    createOrder
  );
  orderRouter.get(
    '/:id',
    requireAuthentication,
    validate(getOrderById.validationSheme),
    getOrderById
  );
  orderRouter.put(
    '/:id',
    requireAuthentication,
    validate(updateOrderById.validationSheme),
    updateOrderById
  );
 
  orderRouter.get(
    '/klant/:id',
    requireAuthentication,
    requireKlant,
    getOrderByKlantId
  );

  orderRouter.get(
    '/leverancier/:id',
    requireAuthentication,
    requireLeverancier,
    getOrderByLeverancierId
  );

  router.use(orderRouter.routes()).use(orderRouter.allowedMethods());
};