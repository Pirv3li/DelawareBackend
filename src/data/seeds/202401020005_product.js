const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.product).delete(); 

    await knex(tables.product).insert([{
        idProduct: 1,
        idLeverancier: 1,
        naam: 'kaas',
        eenheidsprijs: 4,
        btwtarrief: 6,
      },

      {
        idProduct: 2,
        idLeverancier: 1,
        naam: 'water',
        eenheidsprijs: 1,
        btwtarrief: 6,
      },
      {
        idProduct: 3,
        idLeverancier: 1,
        naam: 'brood',
        eenheidsprijs: 3,
        btwtarrief: 6,
      },
    ]);
  },
}