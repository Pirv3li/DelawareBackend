const { tables } = require('..');
const Role = require('../../core/roles');

module.exports = {
  seed: async (knex) => {
    await knex(tables.user).delete(); 

    await knex(tables.user).insert([{
        id: 1,
        username: 'klant',
        name: 'klant',
        last_name: 'achternaamKlant',
        date_of_birth: '2000-01-01',
        email: 'klant@hotmail.com',
        password_hash:'$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        roles: JSON.stringify([Role.KLANT]),
      },
      {
        id: 2,
        username: 'leverancier',
        name: 'leverancier',
        last_name: 'achternaamLeverancier',
        date_of_birth: '2000-01-02',
        email: 'leverancier@hotmail.com',
        password_hash:
        '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
      roles: JSON.stringify([Role.LEVER]),
      },
      {
        id: 3,
        username: 'admin',
        name: 'admin',
        last_name: 'achternaamAdmin',
        date_of_birth: '2000-01-03',
        email: 'admin@hotmail.com',
        password_hash:
          '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
        roles: JSON.stringify([Role.ADMIN]),
      },
    ]);
  },
}