const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.product, (table) => {
      table.increments('idProduct').primary();
      table.string('naam', 255).notNullable();
      table.double('eenheidsprijs').notNullable();
      table.integer('btwtarrief').notNullable();
      table.string('link', 255).notNullable();

      table.integer('idLeverancier').unsigned().notNullable();

      table.foreign('idLeverancier', "fk_product_leverancier")
        .references(`${tables.leverancier}.idLeverancier`)
        .onDelete('CASCADE');
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.product);
  },
};
