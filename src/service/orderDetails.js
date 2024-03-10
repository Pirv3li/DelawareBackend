const orderDetailsRepository = require("../repository/orderDetails");

// const getAllOrderDetails = async () => {
//   const items = await orderDetailsRepository.getAllOrderDetails();
//   return {
//     items,
//     count: items.length,
//   };
// };

const getOrderDetailsById = async (idOrderDetails) => {
  try {
    const orderDetails = await orderDetailsRepository.getOrderDetailsById(
      idOrderDetails
    );
    if (!orderDetails) {
      throw ServiceError.notFound(
        `There is no orderDetails with id ${idOrderDetails}.`,
        { idOrderDetails }
      );
    }
    return orderDetails;
  } catch (error) {
    throw new Error(error);
  }
};

const getOrderDetailsByOrderId = async (idOrder) => {
  try {
    const orderdetails = await orderDetailsRepository.getOrderDetailsByOrderId(
      idOrder
    );
    if (!orderdetails) {
      throw ServiceError.notFound(
        `There is no orderDetails with id ${idOrder}.`,
        { idOrder }
      );
    }
    return orderdetails;
  } catch (error) {
    throw new Error(error);
  }
};

// const createOrderDetails = async ({ eenheidsprijs, aantal, idOrder, idProduct }) => {
//   const idNewOrderDetails = await orderDetailsRepository.createOrderDetails({
//     eenheidsprijs,
//     aantal,
//     idOrder,
//     idProduct,
//   });

//   return await orderDetailsRepository.getOrderDetailsById(idNewOrderDetails);
// };

// const updateOrderDetailsById = async (id, { eenheidsprijs, aantal, idOrder, idProduct }) => {
//   const idUpdatedOrderDetails = await orderDetailsRepository.updateOrderDetailsById(id, {
//     eenheidsprijs,
//     aantal,
//     idOrder,
//     idProduct,
//   });
//   return await orderDetailsRepository.getOrderDetailsById(idUpdatedOrderDetails);
// };

module.exports = {
  getOrderDetailsById,
  getOrderDetailsByOrderId,
};
