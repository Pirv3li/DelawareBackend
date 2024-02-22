const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.bedrijf).delete(); 

    await knex(tables.bedrijf).insert([{

        idBedrijf: 1,
        idAdres:1,
        naam: 'delhaize',
        logo: 'klant',
        sector: 'klant@hotmail.com',
        iban: 'BE68539007547034',
        btwNummer: 'BE1234567890',
        telefoonnummer: '0477777777',
        gebruikerSinds: '2022-02-22',

      },
      {
       idBedrijf: 2,
       idAdres:2,
        naam: 'colruyt',
        logo: 'klant',
        sector: 'klant@hotmail.com',
        iban: 'BE68539007547034',
        btwNummer: 'BE1234567890',
        telefoonnummer: '0477777777',
        gebruikerSinds: '2021-02-22',
        
      },
      {
        idBedrijf: 3,
        idAdres:2,

        naam: 'Aldi',
        logo: 'klant',
        sector: 'klant@hotmail.com',
        iban: 'BE68539007547034',
        btwNummer: 'BE1234567890',
        telefoonnummer: '0477777777',
        gebruikerSinds: '2020-02-22',
        
      },
    ]);
  },
}