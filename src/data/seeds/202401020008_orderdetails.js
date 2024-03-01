const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.orderDetails).delete();

    await knex(tables.orderDetails).insert([
      {
        idOrderDetails: 1,
        eenheidsprijs: 10.5,
        aantal: 2,
        idOrder: 1,
        idProduct: 1,
      },
      {
        idOrderDetails: 2,
        eenheidsprijs: 15.0,
        aantal: 1,
        idOrder: 1,
        idProduct: 2,
      },
      {
        idOrderDetails: 3,
        eenheidsprijs: 7.5,
        aantal: 3,
        idOrder: 2,
        idProduct: 3,
      },
    ]);
  },
};
