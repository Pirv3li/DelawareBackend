const KoaRouter = require("@koa/router");
const Joi = require("joi");
const { requireAuthentication } = require("../core/auth");
const orderDetailsService = require("../service/orderDetails");
const validate = require("../core/validation");
const ServiceError = require('../core/serviceError');
const orderService = require("../service/order");

// const getAllOrderDetails = async (ctx) => {
//   ctx.body = await orderDetailsService.getAllOrderDetails();
// };
// getAllOrderDetails.validationSheme = null

const getOrderDetailsById = async (ctx) => {
  try {
    const orderDetail = await orderDetailsService.getOrderDetailsById(ctx.params.id);
    const order = await orderService.getOrderById(orderDetail.idOrder); // Fetch order

    // Check if user has permission
    if (order.idKlant !== ctx.state.session.idKlant &&
        order.idLeverancier !== ctx.state.session.idLeverancier) {
      ctx.status = 403;
      ctx.body = { message: "Permission denied" };
      return;
    }

    ctx.body = orderDetail;
  } catch (error) {
    if (error instanceof ServiceError && error.isNotFound) {
      ctx.status = 404;
      ctx.body = { message: error.message };
    } else {
      ctx.status = 500;
      ctx.body = { message: "Internal Server Error" };
    }
  }
};

getOrderDetailsById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const getOrderDetailsByOrderId = async (ctx) => {
  let order;

  const orderID = ctx.params.id;

  try {
    order = await orderService.getOrderById(ctx.params.id); // Fetch order inside try block
  } catch (error) {
    ctx.status = 404;
    ctx.body = { message: "Order not found" };
    return;
  }

  if (
    order.idKlant !== ctx.state.session.idKlant &&
    order.idLeverancier !== ctx.state.session.idLeverancier
  ) {
    ctx.status = 403;
    ctx.body = { message: "Permission denied" };
    return;
  }

  try {
    const orderDetailsId = await orderDetailsService.getOrderDetailsByOrderId(
      orderID
    );

    ctx.body = orderDetailsId;
  } catch (error) {
    ctx.body = { message: error.message };
  }
};
getOrderDetailsByOrderId.validationScheme = {
  params: {
    id: Joi.string(),
  },
};

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
    prefix: "/orderDetails",
  });

  // orderDetailsRouter.get(
  //   '/',
  //   requireAuthentication,
  //   validate(getAllOrderDetails.validationSheme),
  //   getAllOrderDetails
  // );

  orderDetailsRouter.get(
    "/order/:id",
    requireAuthentication,
    validate(getOrderDetailsByOrderId.validationScheme),
    getOrderDetailsByOrderId
  );

  // orderDetailsRouter.post(
  //   '/',
  //   requireAuthentication,
  //   validate(createOrderDetails.validationSheme),
  //   createOrderDetails
  // );

  orderDetailsRouter.get(
    "/:id",
    requireAuthentication,
    validate(getOrderDetailsById.validationScheme),
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

  router
    .use(orderDetailsRouter.routes())
    .use(orderDetailsRouter.allowedMethods());
};
