const { tables } = require('..');
const Role = require('../../core/roles');

module.exports = {
  seed: async (knex) => {
    await knex(tables.User).delete(); 

    await knex(tables.User).insert([{
      
        idUser: 1,
        gebruikersnaam: 'delhaizeL',
        isActief:'true',
        password_hash:
        '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        roles: JSON.stringify([Role.LEVER]),
        klantnummer: '/',
        leveranciernummer: '87654321',
      },
      {
        idUser: 2,
        gebruikersnaam: 'delhaizeK',
        isActief:'true',
        password_hash:
        '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        roles: JSON.stringify([Role.KLANT]),
        klantnummer: '87654321',
        leveranciernummer: '/',
      },
    ]);
  },
}