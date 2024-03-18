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
      {
        idNotificatie: 4,
        idOrder: "2402011150a1b",
        text: "Order placed",
        onderwerp: "Order",
        geopend: false,
        afgehandeld: false,
        datum: '2024-02-01',

      },
      {
        idNotificatie: 5,
        idOrder: "2402011150a1b",
        text: "Order placed",
        onderwerp: "Order",
        geopend: false,
        afgehandeld: false,
        datum: '2024-02-01',

      },
      {
        idNotificatie: 6,
        idOrder: "2402011150a1b",
        text: "Order placed",
        onderwerp: "Order",
        geopend: false,
        afgehandeld: false,
        datum: '2024-02-01',

      },
      {
        idNotificatie: 7,
        idOrder: "2402011150a1b",
        text: "Order placed",
        onderwerp: "Order",
        geopend: false,
        afgehandeld: false,
        datum: '2024-02-01',

      },
      {
        idNotificatie: 8,
        idOrder: "2402011150a1b",
        text: "Order placed",
        onderwerp: "Order",
        geopend: false,
        afgehandeld: false,
        datum: '2024-02-01',

      },
      {
        idNotificatie: 9,
        idOrder: "2402011150a1b",
        text: "Order placed",
        onderwerp: "Order",
        geopend: false,
        afgehandeld: false,
        datum: '2024-02-01',

      },
      {
        idNotificatie: 10,
        idOrder: "2402011150a1b",
        text: "Order placed",
        onderwerp: "Order",
        geopend: false,
        afgehandeld: false,
        datum: '2024-02-01',

      },
      {
        idNotificatie: 11,
        idOrder: "2402011150a1b",
        text: "Order placed",
        onderwerp: "Order",
        geopend: false,
        afgehandeld: false,
        datum: '2024-02-01',

      },
      {
        idNotificatie: 12,
        idOrder: "2402011150a1b",
        text: "Order placed",
        onderwerp: "Order",
        geopend: false,
        afgehandeld: false,
        datum: '2024-02-01',

      },
      {
        idNotificatie: 13,
        idOrder: "2402011150a1b",
        text: "Order placed",
        onderwerp: "Order",
        geopend: false,
        afgehandeld: false,
        datum: '2024-02-01',
      },
    ]);
  },
};
