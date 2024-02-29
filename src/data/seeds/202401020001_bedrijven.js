const { tables } = require("..");

module.exports = {
  seed: async (knex) => {
    await knex(tables.bedrijf).delete();

    await knex(tables.bedrijf).insert([
      {
        idBedrijf: 1,
        idAdres: 1,
        naam: "delhaize",
        logo: "https://static.delhaize.be/site/binaries/_ht_1588072271000/lg/content/gallery/image-components/delhaize-belgium-nl/aboutdelhaize_ourbrands/comp_00001b5h.jpg?imwidth=576",
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
        logo: "https://cdn.worldvectorlogo.com/logos/colruyt-3.svg",
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
        logo: "https://logowik.com/content/uploads/images/aldi8490.jpg",
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
