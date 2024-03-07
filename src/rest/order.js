const KoaRouter = require("@koa/router");
const Joi = require("joi");
const { requireAuthentication, makeRequireRole } = require("../core/auth");
const orderService = require("../service/order");
const validate = require("../core/validation");
const Role = require("../core/roles");

const getOrderById = async (ctx) => {
  // is de request van klant of leverancier
  const isKlant = ctx.state.role === "klant";
  const isLeverancier = ctx.state.role === "leverancier";

  try {
    // Get order by ID
    const orderId = ctx.params.id;
    const order = await orderService.getOrderById(orderId);

    // Check if the user is authorized to view this order
    if (
      (isKlant && order.idKlant !== ctx.state.session) ||
      (isLeverancier && order.idLeverancier !== ctx.state.session)
    ) {
      ctx.status = 403;
      ctx.body = { message: "Permission denied" };
      return;
    }

    // Return the order if everything is okay
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
  const idKlant = ctx.state.session;
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
      nummer: Joi.number().required(),
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

  const idKlant = ctx.state.session;
  const idLeverancier = ctx.state.session;
  const idUser = null;

  // request van klant of leverancier
  const isKlant = ctx.state.role === "klant";
  const isLeverancier = ctx.state.role === "leverancier";
  const order = await orderService.getOrderById(ctx.params.id);
  // welke veld mag geupdate worden gebaseerd op rol
  let updateFields = {};

  if (isKlant && order.idKlant === idKlant) {
    idUser = idKlant;
    updateFields = { betalingStatus: betalingStatus };
  } else if (isLeverancier && order.idLeverancier === idLeverancier) {
    idUser = idLeverancier;
    updateFields = { orderStatus: orderStatus };
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
    if (error.status === 403) {
      ctx.body = { message: "Permission denied" };
    }
    ctx.status = 500;
    ctx.body = { message: error.message };
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

const getOrderByKlant = async (ctx) => {
  const { idKlant } = ctx.state.session;
  try {
    const ordersKlant = await orderService.getOrderByKlantId(idKlant);
    ctx.body = ordersKlant;
  } catch (error) {
    ctx.status = error.status;
    ctx.body = { message: error.message };
  }
};

getOrderByKlant.validationScheme = null;

const getOrderByLeverancier = async (ctx) => {
  const { idLeverancier } = ctx.state.session;

  try {
    const ordersLeverancier = await orderService.getOrderByLeverancierId(
      idLeverancier
    );
    ctx.body = ordersLeverancier;
  } catch (error) {
    ctx.status = error.status;
    ctx.body = { message: error.message };
  }
};

getOrderByLeverancier.validationScheme = null;

requireLeverancier = makeRequireRole(Role.LEVER);
requireKlant = makeRequireRole(Role.KLANT);

/**
 * Install order routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const orderRouter = new KoaRouter({
    prefix: "/order",
  });

  orderRouter.post(
    "/",
    requireAuthentication,
    requireKlant,
    validate(createOrder.validationScheme),
    createOrder
  );

  orderRouter.get(
    "/:id",
    requireAuthentication,
    validate(getOrderById.validationScheme),
    getOrderById
  );

  orderRouter.put(
    "/:id",
    requireAuthentication,
    validate(updateOrderById.validationScheme),
    updateOrderById
  );

  orderRouter.get(
    "/klant",
    requireAuthentication,
    requireKlant,
    getOrderByKlant
  );

  orderRouter.get(
    "/leverancier",
    requireAuthentication,
    requireLeverancier,
    getOrderByLeverancier
  );

  router.use(orderRouter.routes()).use(orderRouter.allowedMethods());
};
