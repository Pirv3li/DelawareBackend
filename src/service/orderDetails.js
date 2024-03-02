const orderDetailsRepository = require('../repository/orderDetails');

const getAllOrderDetails = async () => {
  const items = await orderDetailsRepository.getAllOrderDetails();
  return {
    items,
    count: items.length,
  };
};

const getOrderDetailsById = async (idOrderDetails) => {
  const orderDetails = await orderDetailsRepository.getOrderDetailsById(idOrderDetails);
  if (!orderDetails) {
    throw ServiceError.notFound(`There is no orderDetails with id ${idOrderDetails}.`, { idOrderDetails });
  }
  
};

const getOrderDetailsByOrderId = async (idOrder) => {
  return orderDetailsRepository.getOrderDetailsByOrderId(idOrder);
};

const createOrderDetails = async ({ eenheidsprijs, aantal, idOrder, idProduct }) => {
  const idNewOrderDetails = await orderDetailsRepository.createOrderDetails({
    eenheidsprijs,
    aantal,
    idOrder,
    idProduct,
  });

  return await orderDetailsRepository.getOrderDetailsById(idNewOrderDetails);
};

const updateOrderDetailsById = async (id, { eenheidsprijs, aantal, idOrder, idProduct }) => {
  const idUpdatedOrderDetails = await orderDetailsRepository.updateOrderDetailsById(id, {
    eenheidsprijs,
    aantal,
    idOrder,
    idProduct,
  });
  return await orderDetailsRepository.getOrderDetailsById(idUpdatedOrderDetails);
};

const deleteOrderDetailsById = async (id) => {
  await orderDetailsRepository.deleteOrderDetailsById(id);
};

module.exports = {
  getAllOrderDetails,
  getOrderDetailsById,
  createOrderDetails,
  updateOrderDetailsById,
  deleteOrderDetailsById,
  getOrderDetailsByOrderId,
};