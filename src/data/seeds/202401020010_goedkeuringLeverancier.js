const { tables } = require("..");
const Role = require("../../core/roles");

module.exports = {
   seed: async (knex) => {
    await knex(tables.goedkeuringleverancier).delete();

    await knex(tables.goedkeuringleverancier).insert([
      {
        idGoedkeuringLeverancier: 1,
        leverancierNummer: "87654321",
        gebruikersnaam: "john_doe",
        email: "john.doe@example.com",
        password_hash: "hashed_password",
        isActief: true,
        roles: JSON.stringify([Role.LEVER]),
        idBedrijf: 1,
        idLeverancier: 1,
      },
    ]);
}}