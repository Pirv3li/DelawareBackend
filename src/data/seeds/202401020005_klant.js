const { tables } = require('..');
const Role = require('../../core/roles');

module.exports = {
  seed: async (knex) => {
    await knex(tables.klant).delete(); 

    await knex(tables.klant).insert([{
        idKlant: 1,
        klantNummer: '87654321',
        gebruikersnaam: 'user1',
        password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        isActief: true,
      },

      {
        idKlant: 2,
        klantNummer: '87654321',
        gebruikersnaam: 'user2',
        password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        isActief: true,
      },
      {
        idKlant: 3,
        klantNummer: '87654321',
        gebruikersnaam: 'user3',
        password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        isActief: true,
      },
    ]);
  },
}