const { tables } = require('..');
const Role = require('../../core/roles');

module.exports = {
  seed: async (knex) => {
    await knex(tables.leverancier).delete(); 

    await knex(tables.leverancier).insert([{
        idLeverancier: 1,
        leverancierNummer: '87654321',
        gebruikersnaam: 'leverancier1',
        password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        isActief: true,
        roles: JSON.stringify([Role.LEVER]),
      },

      {
        idLeverancier: 2,
        leverancierNummer: '87654321',
        gebruikersnaam: 'leverancier2',
        password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        isActief: true,
        roles: JSON.stringify([Role.LEVER]),
      },
      {
        idLeverancier: 3,
        leverancierNummer: '87654321',
        gebruikersnaam: 'leverancier3',
        password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        isActief: true,
        roles: JSON.stringify([Role.LEVER]),
      },
    ]);
  },
}