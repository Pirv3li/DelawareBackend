const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.product, (table) => {
<<<<<<< HEAD
      table.increments('idProduct').primary();
      table.string('naam', 255).notNullable();
      table.double('eenheidsprijs').notNullable();
      table.integer('btwtarrief').notNullable();
      
      table.integer('idLeverancier').unsigned().notNullable();

      table.foreign('idLeverancier', "fk_product_leverancier")
        .references(`${tables.leverancier}.idLeverancier`)
        .onDelete('CASCADE');
=======
      table.increments("idProduct").primary();
      table.integer("naam").unsigned().notNullable();
      table.double("eenheidsprijs").notNullable();
      table.integer("btwtarrief").notNullable();
>>>>>>> 9272507 (nieuwe migraties en seeds)
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.product);
  },
};
