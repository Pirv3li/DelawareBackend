const { tables } = require("..");
const Role = require("../../core/roles");

module.exports = {
  seed: async (knex) => {
    await knex(tables.klant).delete();

    await knex(tables.klant).insert([
      {
        idKlant: 1,
        klantNummer: "87654321",
        gebruikersnaam: "klant1",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        isActief: true,
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 1,
        email: "papunanoniashvili@gmail.com",
      },

      {
        idKlant: 2,
        klantNummer: "87654321",
        gebruikersnaam: "klant2",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        isActief: true,
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 2,
        email: "klant2@example.com",
      },

      {
        idKlant: 3,
        klantNummer: "87654321",
        gebruikersnaam: "klant3",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        isActief: true,
        roles: JSON.stringify([Role.KLANT]),
        idBedrijf: 3,
        email: "klant3@example.com",
      },
    ]);
  },
};
