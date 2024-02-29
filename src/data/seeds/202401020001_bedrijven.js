const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.bedrijf).delete();

    await knex(tables.bedrijf).insert([
      {
        idBedrijf: 1,
        idAdres: 1,
        naam: "delhaize",
        logo: "logo1",
        sector: "sector1",
        email: "delhaize@example.com",
        iban: "BE68539007547034",
        btwNummer: "BE1234567890",
        telefoonnummer: "0477777777",
        gebruikerSinds: knex.fn.now(),
      },
      {
        idBedrijf: 2,
        idAdres: 2,
        naam: "colruyt",
        logo: "logo2",
        sector: "sector2",
        email: "colruyt@example.com",
        iban: "BE68539007547034",
        btwNummer: "BE1234567890",
        telefoonnummer: "0477777777",
        gebruikerSinds: knex.fn.now(),
      },
      {
        idBedrijf: 3,
        idAdres: 3,
        naam: "Aldi",
        logo: "logo3",
        sector: "sector3",
        email: "aldi@example.com",
        iban: "BE68539007547034",
        btwNummer: "BE1234567890",
        telefoonnummer: "0477777777",
        gebruikerSinds: knex.fn.now(),
      },
    ]);
  },
};
