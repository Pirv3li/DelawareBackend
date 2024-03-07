const { tables } = require("..");
const Role = require("../../core/roles");

module.exports = {
   seed: async (knex) => {
    await knex(tables.goedkeuringklant).delete();

    await knex(tables.goedkeuringklant).insert([
      {
        idGoedkeuringKlant: 1,
        klantNummer: "87654321",
        gebruikersnaam: "john_doe",
        email: "john.doe@example.com",
        password_hash: "hashed_password",
        isActief: true,
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 1,
        idKlant: 1,
      },
    ]);
}}