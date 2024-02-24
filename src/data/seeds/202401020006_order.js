const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.order).delete();

    await knex(tables.order).insert([{
      idOrder: 1,
      idKlant: 1,
      idLeverancier: 2,
      idAdres: 1,
      datum: '2024-02-01',
      orderStatus: 'niet-verzonden',
      betalingStatus: 'niet betaald',
      totaalPrijs: '15.55',
    },

    {
      idOrder: 2,
      idKlant: 2,
      idLeverancier: 2,
      idAdres: 2,
      datum: '2024-02-14',
      orderStatus: 'in-transit',
      betalingStatus: 'niet betaald',
      totaalPrijs: '20.55',
    },
    {
      idOrder: 3,
      idKlant: 3,
      idLeverancier: 3,
      idAdres: 3,
      datum: '2024-02-24',
      orderStatus: 'geleverd',
      betalingStatus: 'betaald',
      totaalPrijs: '25.55',
    },
    ]);
  },
}