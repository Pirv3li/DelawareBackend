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
      straat: "Test straat",
      nummer: "1",
      stad: "Test stad",
      postcode: "1234AB",
      laatstGebruikt: new Date(),
    },
    {
      idAdres: 2,
      straat: "Test straat2",
      nummer: "2",
      stad: "Test stad2",
      postcode: "1234AC",
      laatstGebruikt: new Date(),
    },
  ]);
  await knex(tables.bedrijf).insert([
    {
      idBedrijf: 1,
      naam: "Test Company",
      logo: "test-logo.png",
      sector: "Technology",
      iban: "NL20INGB0001234567",
      btwNummer: "NL123456789B01",
      telefoonnummer: "0123456789",
      gebruikerSinds: new Date(),
      idAdres: 1,
    },
    {
      idBedrijf: 2,
      naam: "Another Company",
      logo: "another-logo.png",
      sector: "Finance",
      iban: "NL20INGB0009876543",
      btwNummer: "NL987654321B01",
      telefoonnummer: "0987654321",
      gebruikerSinds: new Date(),
      idAdres: 2,
    },
    {
      idBedrijf: 3,
      naam: "Third Company",
      logo: "third-logo.png",
      sector: "Healthcare",
      iban: "NL20INGB0002468135",
      btwNummer: "NL246813579B01",
      telefoonnummer: "0246813579",
      gebruikerSinds: new Date(),
      idAdres: 1,
    },
  ]);

  await knex(tables.leverancier).insert([
    {
      idLeverancier: 2,
      gebruikersnaam: "Test Leverancier User",
      password_hash:
        "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
      isActief: true,
      leverancierNummer: 123456789,
      roles: JSON.stringify([roles.LEVER]),
    },
    {
      idLeverancier: 1,
      gebruikersnaam: "Test Leverancier User2",
      password_hash:
        "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
      isActief: true,
      leverancierNummer: 123456781,
      roles: JSON.stringify([roles.LEVER]),
    },
  ]);
  
  await knex(tables.klant).insert([
    {
      idKlant: 1,
      gebruikersnaam: "Test Klant User",
      password_hash:
        "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
      isActief: true,
      klantNummer: 123456789,
      roles: JSON.stringify([roles.KLANT]),
    },
    {
      idKlant: 2,
      gebruikersnaam: "Test Klant User2",
      password_hash:
        "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4",
      isActief: true,
      klantNummer: 123456781,
      roles: JSON.stringify([roles.KLANT]),
    },
  ]);
};
