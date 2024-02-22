const { tables } = require('..');
const Role = require('../../core/roles');

module.exports = {
  seed: async (knex) => {
    await knex(tables.bedrijf).delete(); 

    await knex(tables.bedrijf).insert([{

        idBedrijf: 1,
        naam: 'delhaize',
        logo: 'klant',
        sector: 'klant@hotmail.com',
        straat: 'tesstraat',
        nummer: 1,
        postcode: 9000,
        stad: 'Gent',
        iban: 'BE68539007547034',
        btwNummer: 'BE1234567890',
        telefoonnummer: '0477777777',
        gebruikerSinds: '2022-02-22',

      },
      {
       idBedrijf: 2,
        naam: 'colruyt',
        logo: 'klant',
        sector: 'klant@hotmail.com',
        straat: 'tesstraat',
        nummer: 1,
        postcode: 4000,
        stad: 'antwerpen',
        iban: 'BE68539007547034',
        btwNummer: 'BE1234567890',
        telefoonnummer: '0477777777',
        gebruikerSinds: '2021-02-22',
        
      },
      {
        idBedrijf: 3,
        naam: 'Aldi',
        logo: 'klant',
        sector: 'klant@hotmail.com',
        straat: 'tesstraat',
        nummer: 1,
        postcode: 1000,
        stad: 'Brussel',
        iban: 'BE68539007547034',
        btwNummer: 'BE1234567890',
        telefoonnummer: '0477777777',
        gebruikerSinds: '2020-02-22',
        
      },
    ]);
  },
}