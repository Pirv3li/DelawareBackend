const { getKnex, tables } = require("../data");

// const getAllOrderDetails = async () => {
//   return getKnex()(tables.orderDetails).select("*");
// };

const getOrderDetailsById = async (idOrderDetails) => {
  const orderDetails = await getKnex()(tables.orderDetails)
    .where("idOrderDetails", idOrderDetails)
    .select("*")
    .first();

  return orderDetails;
};

const getOrderDetailsByOrderId = async (idOrder) => {
  return getKnex()(tables.orderDetails)
    .join(
      tables.product,
      `${tables.orderDetails}.idProduct`,
      "=",
      `${tables.product}.idProduct`
    )
    .where(`${tables.orderDetails}.idOrder`, idOrder)
    .select(`${tables.orderDetails}.*`, `${tables.product}.*`);
};

// const createOrderDetails = async (idOrder, products) => {
//   // doorloop elke product en insert in databank
//   const insertedIds = await Promise.all(
//     products.map(async (product) => {
//       const { eenheidsprijs, aantal, idProduct } = product;

//       const [id] = await getKnex()(tables.orderDetails).insert({
//         eenheidsprijs,
//         aantal,
//         idOrder,
//         idProduct,
//       });

//       return id;
//     })
//   );

//   return insertedIds; // Return alle Id's van orderdetails
// };



module.exports = {
  getOrderDetailsById,
  getOrderDetailsByOrderId,
};
