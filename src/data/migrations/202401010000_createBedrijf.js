const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.bedrijf, (table) => {
      table.increments('idBedrijf').primary();
      table.string('naam', 255).notNullable();
      table.string('logo', 255).notNullable();
      table.string('sector', 255).notNullable();
      table.string('straat', 255).notNullable();
      table.integer('nummer').notNullable();
      table.integer('postcode').notNullable();
      table.string('stad', 255).notNullable();
      table.string('iban', 255).notNullable();
      table.string('btwNummer', 255).notNullable();
      table.string('telefoonnummer', 255).notNullable();
      table.timestamp('gebruikerSinds').notNullable();
      
      

    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.bedrijf);
  },
};
