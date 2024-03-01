const { getKnex, tables } = require('../data');

const getAllOrderDetails = async () => {
  return getKnex()(tables.orderDetails)
    .select('*');
};

const getOrderDetailsById = async (idOrderDetails) => {
  const orderDetails = await getKnex()(tables.orderDetails)
    .where('idOrderDetails', idOrderDetails)
    .first();

  return orderDetails;
};

const createOrderDetails = async ({ eenheidsprijs, aantal, idOrder, idProduct }) => {
  const [id] = await getKnex()(tables.orderDetails).insert({
    eenheidsprijs,
    aantal,
    idOrder,
    idProduct,
  });

  return id;
};

const updateOrderDetailsById = async (id, { eenheidsprijs, aantal, idOrder, idProduct }) => {
  await getKnex()(tables.orderDetails)
    .where('idOrderDetails', id)
    .update({
      eenheidsprijs,
      aantal,
      idOrder,
      idProduct,
    });
    return id;
};

const deleteOrderDetailsById = async (idOrderDetails) => {
  await getKnex()(tables.orderDetails)
    .where('idOrderDetails', idOrderDetails)
    .del();
};

module.exports = {
  getAllOrderDetails,
  getOrderDetailsById,
  createOrderDetails,
  updateOrderDetailsById,
  deleteOrderDetailsById,
};