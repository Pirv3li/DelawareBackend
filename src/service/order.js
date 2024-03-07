const orderRepository = require("../repository/order");
const adresRepository = require("../repository/adres");
const orderDetailsRepository = require("../repository/orderDetails");

const getOrderById = async (idOrder) => {
  try {
    return orderRepository.getOrderById(idOrder);
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
    const newAdresId = await adresRepository.createAdres({ adres });

    const idNewOrder = await orderRepository.createOrder({
      idKlant,
      idLeverancier,
      datum,
      idAdres: newAdresId,
      orderStatus,
      betalingStatus,
      totaalPrijs,
    });

    await orderDetailsRepository.createOrderDetails(idNewOrder, {
      products,
    });

    return idNewOrder;
  } catch (error) {
    throw new Error(error);
  }
};

const getOrderByKlantId = async (idKlant) => {
  try {
    const items = await orderRepository.getOrderByKlantId(idKlant);
    return items;
  } catch (error) {
    throw new Error(error);
  }
};

const getOrderByLeverancierId = async (idLeverancier) => {
  try {
    const items = await orderRepository.getOrderByLeverancierId(idLeverancier);
    return {
      items,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const updateOrderById = async (idOrder, { orderStatus, betalingStatus }) => {
  let updateFields = {};

  // slaat alleen waarde op die meegegeven is
  if (orderStatus !== undefined) {
    updateFields.orderStatus = orderStatus;
  } else if (betalingStatus !== undefined) {
    updateFields.betalingStatus = betalingStatus;
  }

  const updatedOrder = await orderRepository.updateOrderById(
    idOrder,
    updateFields
  );
  return updatedOrder;
};

module.exports = {
  getOrderById,
  createOrder,
  updateOrderById,
  getOrderByKlantId,
  getOrderByLeverancierId,
};
