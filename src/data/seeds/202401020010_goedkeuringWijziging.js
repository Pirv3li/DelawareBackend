const { tables } = require("..");
const Role = require("../../core/roles");

module.exports = {
   seed: async (knex) => {
    await knex(tables.goedkeuringWijzigingen).delete();

    await knex(tables.goedkeuringWijzigingen).insert([
        {
            gebruikerNummer: "123456",
            gebruikersnaam: "john_doe",
            email: "john.doe@example.com",
            password_hash: "hashed_password",
            isActief: true,
            roles: JSON.stringify([Role.KLANT]),
            idBedrijf: 1
        },
    ]);
}}