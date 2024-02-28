const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.notificatie).delete();

    await knex(tables.notificatie).insert([
      {
        idNotificatie: 1,
        idOrder: 1,
        text: "Order placed",
        onderwerp: "Order",
        geopend: false,
        afgehandeld: false,
      },
      {
        idNotificatie: 2,
        idOrder: 2,
        text: "Order shipped",
        onderwerp: "Shipping",
        geopend: false,
        afgehandeld: false,
      },
      {
        idNotificatie: 3,
        idOrder: 3,
        text: "Order delivered",
        onderwerp: "Delivery",
        geopend: false,
        afgehandeld: false,
      },
    ]);
  },
};
