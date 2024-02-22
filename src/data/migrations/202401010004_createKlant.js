const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.klant, (table) => {
      table.increments('idKlant').primary();
      table.string('klantNummer', 255).notNullable();
      table.string('gebruikersnaam', 25).notNullable();
      table.string('password_hash').notNullable();
      table.boolean('isActief');
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.klant);
  },
};
