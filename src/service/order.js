const orderRepository = require("../repository/order");
const adresRepository = require("../repository/adres");
const orderDetailsRepository = require("../repository/orderDetails");
const ServiceError = require('../core/serviceError');
const { error } = require("winston");

const getOrderById = async (idOrder) => {
  try {
    const order = await orderRepository.getOrderById(idOrder);
    if (!order) {
      throw ServiceError.notFound(
        `There is no order with id ${order}.`,
        { order }
      );
    }
    return order;
  } catch (error) {
    throw new Error(error);
  }
};

const createOrder = async (
  idKlant,
  {
    idLeverancier,
    adres,
    datum,
    orderStatus,
    betalingStatus,
    totaalPrijs,
    products,
  }
) => {
  try {
    const newAdresId = await adresRepository.createAdres(adres);

    const idNewOrder = await orderRepository.createOrder(idKlant,{
      idLeverancier,
      datum,
      idAdres: newAdresId,
      orderStatus,
      betalingStatus,
      totaalPrijs,
    });

    await orderDetailsRepository.createOrderDetails(idNewOrder, 
      products);

    return idNewOrder;
  } catch (error) {
    throw new Error(error);
  }
};

const getOrderByKlantId = async (idKlant, begin) => {
  const items = await orderRepository.getOrderByKlantId(idKlant, begin);
  return{
    items,
  };

};

const getOrderByLeverancierId = async (idLeverancier, begin) => {
  const items = await orderRepository.getOrderByLeverancierId(idLeverancier, begin);
  return{
    items,
  };
  
};

const updateOrderById = async (idOrder, { orderStatus, betalingStatus }) => {
  let updateFields = {};

  // Only store values that are provided
  if (orderStatus !== undefined) {
    updateFields.orderStatus = orderStatus;
  } else if (betalingStatus !== undefined) {
    updateFields.betalingStatus = betalingStatus;
  }

  const updatedOrder = await orderRepository.updateOrderById(
    idOrder,
    updateFields
  );
    
  if (!updatedOrder) {
    throw ServiceError.notFound(
      `There is no order with id ${idOrder}.`,
      { idOrder }
    );
  }
  return updatedOrder;
};


module.exports = {
  getOrderById,
  createOrder,
  updateOrderById,
  getOrderByKlantId,
  getOrderByLeverancierId,
};
