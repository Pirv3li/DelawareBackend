const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.leverancier, (table) => {
      table.increments('idLeverancier').primary();
      table.string('leverancierNummer', 255).notNullable();

      table.integer('idUser').unsigned().notNullable();

      table.foreign('idUser', "fk_leverancier_user")
        .references(`${tables.user}.idUser`)
        .onDelete('CASCADE');
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.leverancier);
  },
};
