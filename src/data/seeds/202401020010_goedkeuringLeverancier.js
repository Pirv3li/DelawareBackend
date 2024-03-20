const { tables } = require("..");
const Role = require("../../core/roles");

module.exports = {
   seed: async (knex) => {
    await knex(tables.goedkeuringleverancier).delete();

    await knex(tables.goedkeuringleverancier).insert([
      {
        idGoedkeuringLeverancier: 1,
        leverancierNummer: "123456",
        gebruikersnaam: "supplier1",
        email: "supplier1@example.com",
        password_hash: "hashedpassword",
        isActief: true,
        roles: JSON.stringify([Role.LEVER]),
        iban: "NL20INGB0001234567",
        btwNummer: "NL123456789B01",
        telefoonnummer: "0612345678",
        sector: "Electronics",
        straat: "Supplier Street",
        nummer: "1",
        stad: "Supplier City",
        postcode: "1234AB",
        afgehandeld: "afgekeurd",
        datumAanvraag: new Date(2024, 20, 3),
        idLeverancier: 1,
      },
    ]);
}}