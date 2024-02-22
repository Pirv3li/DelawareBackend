const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.klant, (table) => {
      table.increments('idKlant').primary();
      table.string('klantNummer', 255).notNullable();

      table.integer('idUser').unsigned().notNullable();

      table.foreign('idUser', "fk_klant_user")
        .references(`${tables.user}.idUser`)
        .onDelete('CASCADE');
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.klant);
  },
};
