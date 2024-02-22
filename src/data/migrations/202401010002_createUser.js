const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.user, (table) => {
      table.increments('idUser').primary();
      table.string('gebruikersnaam', 255).notNullable();
      table.string('password_hash').notNullable(); 
      table.boolean('isActief').notNullable();
      table.jsonb('roles').notNullable();
      table.string('klantnummer').notNullable();
      table.string('leveranciernummer').notNullable();
      
      table.integer('idBedrijf').unsigned().notNullable();

      table.foreign('idBedrijf', "fk_user_bedrijf")
        .references(`${tables.bedrijf}.idBedrijf`)
        .onDelete('CASCADE');
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.user);
  },
};
