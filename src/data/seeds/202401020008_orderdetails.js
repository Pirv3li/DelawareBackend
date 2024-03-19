const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.orderDetails).delete();

    await knex(tables.orderDetails).insert([
      {
        idOrderDetails: 1,
        eenheidsprijs: 10.5,
        aantal: 2,
        idOrder: "2402011150a1b",
        idProduct: 1,
      },
      {
        idOrderDetails: 2,
        eenheidsprijs: 15.0,
        aantal: 1,
        idOrder: "2402011150a1b",
        idProduct: 2,
      },
      {
        idOrderDetails: 3,
        eenheidsprijs: 7.5,
        aantal: 3,
        idOrder: "2402141205d4e",
        idProduct: 3,
      },
    ]);
  },
};
