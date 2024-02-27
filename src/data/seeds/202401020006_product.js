const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.product).delete(); 

    await knex(tables.product).insert([{
        idProduct: 1,
        idLeverancier: 1,
        naam: 'kaas',
        eenheidsprijs: 4,
        btwtarief: 6,
        foto: 'https://media.nu.nl/m/un2xpm3ag029_wd854/zwitserse-kaas.jpg'
      },

      {
        idProduct: 2,
        idLeverancier: 1,
        naam: 'water',
        eenheidsprijs: 1,
        btwtarief: 6,
        foto: 'https://assets-willemwever.kro-ncrv.nl/public/styles/hero_small/public/water.jpeg?h=a8e2b6ba&itok=ckfRmCSB'
      },
      {
        idProduct: 3,
        idLeverancier: 1,
        naam: 'brood',
        eenheidsprijs: 3,
        btwtarief: 6,
        foto: 'https://www.detrog.be/_userfiles/products/500x500/20220713091003ep0676-productfoto-hires-1.jpg'
      },
    ]);
  },
}