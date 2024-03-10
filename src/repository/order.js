const { getKnex, tables } = require("../data");

const formatOrder = (result) => ({
  idOrder: result.idOrder,
  idKlant: result.idKlant,
  idLeverancier: result.idLeverancier,
  idAdres: result.idAdres,
  datum: result.datum,
  orderStatus: result.orderStatus,
  betalingStatus: result.betalingStatus,
  totaalPrijs: result.totaalPrijs,
});

const getAllOrders = async () => {
  return getKnex()(tables.order).select("*").orderBy("datum", "desc");
};

const getOrderById = async (idOrder) => {
  const order = await getKnex()(tables.order)
    .leftJoin(
      `${tables.orderDetails}`,
      `${tables.order}.idOrder`,
      `${tables.orderDetails}.idOrder`
    )
    .leftJoin(
      `${tables.leverancier}`,
      `${tables.order}.idLeverancier`,
      `${tables.leverancier}.idLeverancier`
    )

    .where(`${tables.order}.idOrder`, idOrder)
    .first();

  return formatOrder(order);
};

const getOrderByKlantId = async (idKlant) => {
  const order = await getKnex()(tables.order)
  .where("idKlant", idKlant);

  return order;
};

const getOrderByLeverancierId = async (idLeverancier) => {
  const order = await getKnex()(tables.order)
  .where("idLeverancier",idLeverancier);

  return order;
};

const createOrder = async (idKlant, {
  idLeverancier,
  idAdres,
  datum,
  orderStatus,
  betalingStatus,
  totaalPrijs,
}) => {
  const [id] = await getKnex()(tables.order).insert({
    idKlant,
    idLeverancier,
    idAdres,
    datum,
    orderStatus,
    betalingStatus,
    totaalPrijs,
  });
  return id;
};

const updateOrderById = async (idOrder, updateFields) => {
  const updatedOrderId = await getKnex()(tables.order)
    .where("idOrder", idOrder)
    .update(updateFields);

  return updatedOrderId;
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  getOrderByKlantId,
  getOrderByLeverancierId,
};