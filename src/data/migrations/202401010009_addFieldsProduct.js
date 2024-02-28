const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.table(tables.product, (table) => {
      table.integer("aantal").notNullable().defaultTo(0);
      table.decimal("gewicht", 10, 2).notNullable().defaultTo(0.00);
      table.string("beschrijving", 255);
    });
  },
  down: async (knex) => {
    await knex.schema.table(tables.product, (table) => {
      table.dropColumn("aantal");
      table.dropColumn("gewicht");
      table.dropColumn("beschrijving");
    });
  },
};