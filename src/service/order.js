const orderRepository = require('../repository/order');

const getAllOrders = async () => {
  return orderRepository.getAllOrders();
};

const getOrderById = async (idOrder) => {
  return orderRepository.getOrderById(idOrder);
};

const createOrder = async ({ idKlant, idLeverancier, idAdres, datum, orderStatus, betalingStatus, totaalPrijs }) => {
  const idNewOrder = await orderRepository.createOrder({
    idKlant,
    idLeverancier,
    idAdres,
    datum,
    orderStatus,
    betalingStatus,
    totaalPrijs,
  });

  return getOrderById(idNewOrder);
};

const updateOrderById = async (idOrder, { idKlant, idLeverancier, idAdres, datum, orderStatus, betalingStatus, totaalPrijs }) => {
  await orderRepository.updateOrderById(idOrder, {
    idKlant,
    idLeverancier,
    idAdres,
    datum,
    orderStatus,
    betalingStatus,
    totaalPrijs,
  });
};

const deleteOrderById = async (idOrder) => {
  await orderRepository.deleteOrderById(idOrder);
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById,
};