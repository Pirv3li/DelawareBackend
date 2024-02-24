const { tables } = require('..');
const Role = require('../../core/roles');

module.exports = {
  seed: async (knex) => {
    await knex(tables.leverancier).delete(); 

    await knex(tables.leverancier).insert([{
        idLeverancier: 1,
        idUser: 1,
        leverancierNummer: '87654321',
      },

      {
        idLeverancier: 2,
        idUser: 2,
        leverancierNummer: '87654321',
      },
      {
        idLeverancier: 3,
        idUser: 3,
        leverancierNummer: '87654321',
      },
    ]);
  },
}