const KoaRouter = require("@koa/router");
const Joi = require('joi');
const { requireAuthentication } = require('../core/auth');
const orderDetailsService = require('../service/orderDetails');
const validate = require('../core/validation')

// const getAllOrderDetails = async (ctx) => {
//   ctx.body = await orderDetailsService.getAllOrderDetails();
// };
// getAllOrderDetails.validationSheme = null

const getOrderDetailsById = async (ctx) => {
  ctx.body = await orderDetailsService.getOrderDetailsById(Number(ctx.params.id));
};
getOrderDetailsById.validationSheme = {
  params: {
    id: Joi.number()
      .integer()
      .positive()
  }
}

const getOrderDetailsByOrderId = async (ctx) => {
  ctx.body = await orderDetailsService.getOrderDetailsByOrderId(Number(ctx.params.id));
};
getOrderDetailsByOrderId.validationSheme = {
  params: {
    id: Joi.number()
      .integer()
      .positive()
  }
}



// const createOrderDetails = async (ctx) => {
//   const { eenheidsprijs, aantal, idOrder, idProduct } = ctx.request.body;
//   const newOrderDetails = await orderDetailsService.createOrderDetails({
//     eenheidsprijs: Number(eenheidsprijs),
//     aantal: Number(aantal),
//     idOrder: Number(idOrder),
//     idProduct: Number(idProduct)
//   });
//   ctx.body = newOrderDetails;
//   ctx.status = 201;
// };
// createOrderDetails.validationSheme = {
//   body: {
//     eenheidsprijs: Joi.number().positive().required(),
//     aantal: Joi.number().integer().positive().required(),
//     idOrder: Joi.number().integer().positive().required(),
//     idProduct: Joi.number().integer().positive().required()
//   }
// }

// const updateOrderDetailsById = async (ctx) => {
//   const { eenheidsprijs, aantal, idOrder, idProduct } = ctx.request.body;
//   ctx.body = await orderDetailsService.updateOrderDetailsById(Number(ctx.params.id), {
//     eenheidsprijs: Number(eenheidsprijs),
//     aantal: Number(aantal),
//     idOrder: Number(idOrder),
//     idProduct: Number(idProduct)
//   });
//   ctx.status = 200;
// };
// updateOrderDetailsById.validationSheme = {
//   params: {
//     id: Joi.number().integer().positive(),
//   },
//   body: {
//     eenheidsprijs: Joi.number().positive().required(),
//     aantal: Joi.number().integer().positive().required(),
//     idOrder: Joi.number().integer().positive().required(),
//     idProduct: Joi.number().integer().positive().required()
//   }
// }

// const deleteOrderDetailsById = async (ctx) => {
//   orderDetailsService.deleteOrderDetailsById(Number(ctx.params.id));
//   ctx.status = 204;
// };
// deleteOrderDetailsById.validationSheme = {
//   params: {
//     id: Joi.number().integer().positive(),
//   },
// }

/**
 * Install orderDetails routes in the given router.
 *
 * @param {KoaRouter} router - The Koa router.
 */
module.exports = (router) => {
  const orderDetailsRouter = new KoaRouter({
    prefix: '/orderDetails',
  });

  // orderDetailsRouter.get(
  //   '/',
  //   requireAuthentication,
  //   validate(getAllOrderDetails.validationSheme),
  //   getAllOrderDetails
  // );

  orderDetailsRouter.get(
    '/order/:id',
    requireAuthentication,
    validate(getOrderDetailsByOrderId.validationSheme),
    getOrderDetailsByOrderId
  );


  // orderDetailsRouter.post(
  //   '/',
  //   requireAuthentication,
  //   validate(createOrderDetails.validationSheme),
  //   createOrderDetails
  // );


  orderDetailsRouter.get(
    '/:id',
    requireAuthentication,
    validate(getOrderDetailsById.validationSheme),
    getOrderDetailsById
  );


  // orderDetailsRouter.put(
  //   '/:id',
  //   requireAuthentication,
  //   validate(updateOrderDetailsById.validationSheme),
  //   updateOrderDetailsById
  // );

  // orderDetailsRouter.delete(
  //   '/:id',
  //   requireAuthentication,
  //   validate(deleteOrderDetailsById.validationSheme),
  //   deleteOrderDetailsById
  // );

  router.use(orderDetailsRouter.routes()).use(orderDetailsRouter.allowedMethods());
};