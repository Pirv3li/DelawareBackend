const config = require('config'); 
const { initializeLogger } = require('../src/core/logging'); 
const Role = require('../src/core/roles'); 
const { initializeData, getKnex, tables } = require('../src/data');


module.exports = async () => {
  // Create a database connection
  initializeLogger({
    level: config.get('log.level'),
    disabled: config.get('log.disabled'),
  });
  await initializeData();

  const knex = getKnex(); 

  await getKnex()(tables.leverancier).delete(); 
  await getKnex()(tables.klant).delete(); 

  await knex(tables.klant).insert([
    {
      idKlant: 1,
      gebruikersnaam: 'Test Klant User',
      password_hash:
        '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
      isActief: true,
      klantNummer: 123456789,
    },
    {
      idKlant: 2,
      gebruikersnaam: 'Test Klant User2',
      password_hash:
        '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
      isActief: true,
      klantNummer: 123456781,
    }]);

    await knex(tables.leverancier).insert([
       {
      idLeverancier: 2,
      gebruikersnaam: 'Test Leverancier User',
      password_hash:
        '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
      isActief: true,
      leverancierNummer: 123456789,
    },
    {
      idLeverancier: 1,
      gebruikersnaam: 'Test Leverancier User2',
      password_hash:
        '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
      isActief: true,
      leverancierNummer: 123456781,
    },
    ]);
};
