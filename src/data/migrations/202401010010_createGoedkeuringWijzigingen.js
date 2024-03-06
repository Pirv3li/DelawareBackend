const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.goedkeuringWijzigingen, (table) => {
      table.increments("idGoedkeuring").primary();
      table.string("gebruikerNummer", 255).notNullable();
      table.string("gebruikersnaam", 50).notNullable();
      table.string("email", 50).notNullable();
      table.string("password_hash").notNullable();
      table.boolean("isActief");
      table.jsonb("roles").notNullable();
      table.integer("idBedrijf").unsigned().notNullable();
      

      table
        .foreign("idBedrijf", "fk_goedkeuringWijziging_Bedrijf")
        .references(`${tables.bedrijf}.idBedrijf`)
        .onDelete("CASCADE");
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.goedkeuringWijzigingen);
  },
};