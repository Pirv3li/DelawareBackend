const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.notificatie).delete();

    await knex(tables.notificatie).insert([
      {
        idNotificatie: 1,
        idOrder: "2402011150a1b",
        text: "Order placed",
        onderwerp: "Order",
        geopend: false,
        afgehandeld: false,
        datum: '2024-02-01',

      },
      {
        idNotificatie: 2,
        idOrder: "2402141205d4e",
        text: "Order shipped",
        onderwerp: "Shipping",
        geopend: false,
        afgehandeld: false,
        datum: '2024-02-01',

      },
      {
        idNotificatie: 3,
        idOrder: "2402241211g7h",
        text: "Order delivered",
        onderwerp: "Delivery",
        geopend: false,
        afgehandeld: false,
        datum: '2024-02-01',

      },
    ]);
  },
};
