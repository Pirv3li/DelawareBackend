const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.goedkeuringleverancier, (table) => {
      table.increments("idGoedkeuringLeverancier").primary();
      table.string("leverancierNummer", 255).notNullable();
      table.string("gebruikersnaam", 50).notNullable();
      table.string("email", 50).notNullable();
      table.string("password_hash").notNullable();
      table.boolean("isActief");
      table.jsonb("roles").notNullable();
      table.integer("idBedrijf").unsigned().notNullable();
      table.integer("idLeverancier").unsigned().notNullable();

      table
        .foreign("idLeverancier", "fk_GoedkeuringLeverancier_Leverancier")
        .references(`${tables.leverancier}.idLeverancier`)
        .onDelete("CASCADE");

      table
        .foreign("idBedrijf", "fk_GoedkeuringLeverancier_Bedrijf")
        .references(`${tables.bedrijf}.idBedrijf`)
        .onDelete("CASCADE");
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.goedkeuringleverancier);
  },
};
