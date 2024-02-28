const KoaRouter = require("@koa/router");
const Joi = require('joi');

const orderService = require('../service/order');
const validate = require('../core/validation')

const getAllOrders = async (ctx) => {
  ctx.body = await orderService.getAllOrders();
};
getAllOrders.validationSheme = null

const getOrderById = async (ctx) => {
  ctx.body = await orderService.getOrderById(Number(ctx.params.id));
};
getOrderById.validationSheme={
  params: {
    id: Joi.number()
      .integer()
      .positive()
  }
}

const createOrder = async (ctx) => {
  const {idKlant, idLeverancier, idAdres, datum, orderStatus, betalingStatus, totaalPrijs} = ctx.request.body;
  const newOrder = await orderService.createOrder({
    idKlant: Number(idKlant),
    idLeverancier: Number(idLeverancier),
    idAdres: Number(idAdres),
    datum: new Date(datum),
    orderStatus: String(orderStatus),
    betalingStatus: String(betalingStatus),
    totaalPrijs: Number(totaalPrijs)
  });
  ctx.body = newOrder;
  ctx.status = 201;
};
createOrder.validationSheme={
    body: {
        idKlant: Joi.number().integer().positive().required(),
        idLeverancier: Joi.number().integer().positive().required(),
        idAdres: Joi.number().integer().positive().required(),
        datum: Joi.date().required(),
        orderStatus: Joi.string().required(),
        betalingStatus: Joi.string().required(),
        totaalPrijs: Joi.number().positive().required()
    }
}

const updateOrderById = async (ctx) => {
  const {idKlant, idLeverancier, idAdres, datum, orderStatus, betalingStatus, totaalPrijs} = ctx.request.body;
  ctx.body = await orderService.updateOrderById(Number(ctx.params.id), {
    idKlant: Number(idKlant),
    idLeverancier: Number(idLeverancier),
    idAdres: Number(idAdres),
    datum: new Date(datum),
    orderStatus: String(orderStatus),
    betalingStatus: String(betalingStatus),
    totaalPrijs: Number(totaalPrijs)
  });
  ctx.status = 200;
};
updateOrderById.validationSheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    idKlant: Joi.number().integer().positive().required(),
    idLeverancier: Joi.number().integer().positive().required(),
    idAdres: Joi.number().integer().positive().required(),
    datum: Joi.date().required(),
    orderStatus: Joi.string().required(),
    betalingStatus: Joi.string().required(),
    totaalPrijs: Joi.number().positive().required()
  }
}

const deleteOrderById = async (ctx) => {
  orderService.deleteOrderById(Number(ctx.params.id));
  ctx.status = 204;
};
deleteOrderById.validationSheme={
  params: {
    id: Joi.number().integer().positive(),
  },
}

/**
 * Install order routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const orderRouter = new KoaRouter({
    prefix: '/order',
  });

  orderRouter.get(
    '/',
    validate(getAllOrders.validationSheme),
    getAllOrders
  );
  orderRouter.post(
    '/',
    validate(createOrder.validationSheme),
    createOrder
  );
  orderRouter.get(
    '/:id',
    validate(getOrderById.validationSheme),
    getOrderById
  );
  orderRouter.put(
    '/:id',
    validate(updateOrderById.validationSheme),
    updateOrderById
  );
  orderRouter.delete(
    '/:id',
    validate(deleteOrderById.validationSheme),
    deleteOrderById
  );

  router.use(orderRouter.routes()).use(orderRouter.allowedMethods());
};