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

  await getKnex()(tables.user).delete(); 

  await knex(tables.user).insert([
    {
      idUser: 1,
      gebruikersnaam: 'Test Klant User',
      password_hash:
        '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
      isActief: true,
      roles: JSON.stringify([Role.KLANT]),
      klantnummer: 123456789,
      leveranciernummer: '/',
      idBedrijf: 1,
    },
    {
      idUser: 2,
      gebruikersnaam: 'Test Leverancier User',
      password_hash:
        '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
      isActief: true,
      roles: JSON.stringify([Role.LEVER]),
      klantnummer: '/',
      leveranciernummer: 123456789,
      idBedrijf: 2,
    },
    {
      idUser: 3,
      gebruikersnaam: 'Test Admin User',
      password_hash:
        '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
      isActief: true,
      roles: JSON.stringify([Role.ADMIN]),
      klantnummer: '/',
      leveranciernummer: '/',
      idBedrijf: 3,
    },
  ]);
};