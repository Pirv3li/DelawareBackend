const config = require("config");
const { initializeLogger } = require("../src/core/logging");
const roles = require("../src/core/roles");
const { initializeData, getKnex, tables } = require("../src/data");

module.exports = async () => {
  // Create a database connection
  initializeLogger({
    level: config.get("log.level"),
    disabled: config.get("log.disabled"),
  });
  await initializeData();

  const knex = getKnex();

  await getKnex()(tables.klant).delete();
  await getKnex()(tables.leverancier).delete();
  await getKnex()(tables.bedrijf).delete();
  await getKnex()(tables.adres).delete();

  await knex(tables.adres).insert([
    {
      idAdres: 1,
        straat: 'tester straat1',
        nummer: "1",
        postcode: "2000",
        stad: 'antwerpen',
        laatstGebruikt: new Date()
    },
    {
      idAdres: 2,
      straat: "Test straat2",
      nummer: 2,
      postcode: "9100",
      stad: "St Nikloas City",
      laatstGebruikt: new Date(),
    },
    {
      idAdres: 3,
      straat: "Test straat3",
      nummer: 3,
      postcode: "1000",
      stad: "brusselse stad",
      laatstGebruikt: new Date(),
    },
  ]);
  await knex(tables.bedrijf).insert([
    {
      idBedrijf: 1,
        idAdres: 1,
        naam: "Test Comp1",
        logo: "Comp Logo test 1",
        sector: "sector1",
        email: "test1@example.com",
        iban: "BE68539007547034",
        btwNummer: "BE1234567890",
        telefoonnummer: "0477777777",
        gebruikerSinds: new Date(),
    },
    {
      idBedrijf: 2,
        idAdres: 2,
        naam: "Test Comp2",
        logo: "Comp Logo test 2",
        sector: "sector2",
        email: "test2@example.com",
        iban: "BE68539007547034",
        btwNummer: "BE1234567890",
        telefoonnummer: "0471234568",
        gebruikerSinds: new Date(),
    },
    {
      idBedrijf: 3,
        idAdres: 3,
        naam: "Test Comp3",
        logo: "Comp Logo test 3",
        sector: "sector3",
        email: "test3@example.com",
        iban: "BE68539007547034",
        btwNummer: "BE1234567890",
        telefoonnummer: "047758569",
        gebruikerSinds: new Date(),
    },
  ]);

  await knex(tables.leverancier).insert([
    {
      idLeverancier: 1,
        leverancierNummer: "256355",
        gebruikersnaam: "test_leverancier1",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        isActief: true,
        roles: JSON.stringify([roles.LEVER]),
        idBedrijf: 1,
        email: "testleverancier1@example.com",
    },
    {
      idLeverancier: 2,
        leverancierNummer: "256565",
        gebruikersnaam: "Test Leverancier User2",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        isActief: true,
        roles: JSON.stringify([roles.LEVER]),
        idBedrijf: 2,
        email: "testleverancier2@example.com",
    },
  ]);
  
  await knex(tables.klant).insert([
    {
      idKlant: 1,
        klantNummer: "87654321",
        gebruikersnaam: "tester_klant1",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        isActief: true,
        roles: JSON.stringify([roles.KLANT]),
        idBedrijf: 1,
        email: "testklant1@example.com",
    },
    {
      idKlant: 2,
        klantNummer: "87654321",
        gebruikersnaam: "Test Klant User2",
        password_hash:
          "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
        isActief: true,
        roles: JSON.stringify([roles.KLANT]),
        idBedrijf: 2,
        email: "testklant2@example.com",
    },
  ]);
};