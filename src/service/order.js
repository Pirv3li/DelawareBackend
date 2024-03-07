const orderRepository = require('../repository/order');
const adresRepository = require('../repository/adres');
const orderDetails = require('../repository/orderDetails');
const orderDetails = require('../rest/orderDetails');

// const getAllOrders = async () => {
//   return orderRepository.getAllOrders();
// };

const getOrderById = async (idOrder) => {
  try {
    return orderRepository.getOrderById(idOrder);
  } catch (error) {
    throw new Error(error);
  }
  
};

const createOrder = async ({  idLeverancier, adres, datum, orderStatus, betalingStatus, totaalPrijs, products }) => {
  const newAdresId = await adresRepository.createAdres({adres});
  
  const idNewOrder = await orderRepository.createOrder({
    idLeverancier,
    datum,
    newAdresId,
    orderStatus,
    betalingStatus,
    totaalPrijs,
  });
  const orderDetails = await orderDetails.createOrderDetails(idNewOrder, {products});

  return idNewOrder;
};

const getOrderByKlantId = async (idKlant) => {
  const items = await orderRepository.getOrderByKlantId(idKlant);
  return{
    items,
  };

};

const getOrderByLeverancierId = async (idLeverancier) => {
  const items = await orderRepository.getOrderByLeverancierId(idLeverancier);
  return{
    items,
  };
  
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
  getOrderByKlantId,
  getOrderByLeverancierId,
};