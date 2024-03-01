const { tables } = require("..");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.notificatie, (table) => {
      table.increments("idNotificatie").primary();
      table.integer("idOrder").unsigned().notNullable();
      table.string("text").notNullable();
      table.string("onderwerp").notNullable();
      table.boolean("geopend").notNullable();
      table.boolean("afgehandeld").notNullable();

      table
        .foreign("idOrder", "fk_Notificatie_Order")
        .references(`${tables.order}.idOrder`)
        .onDelete("CASCADE");
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.notificatie);
  },
};
