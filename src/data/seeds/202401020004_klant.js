const { tables } = require('..');
const Role = require('../../core/roles');

module.exports = {
  seed: async (knex) => {
    await knex(tables.klant).delete(); 

    await knex(tables.klant).insert([{
        idKlant: 1,
        idUser: 1,
        klantNummer: '87654321',
      },

      {
        idKlant: 2,
        idUser: 2,
        klantNummer: '87654321',
      },
      {
        idKlant: 3,
        idUser: 3,
        klantNummer: '87654321',
      },
    ]);
  },
}