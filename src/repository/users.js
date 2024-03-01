const { tables, getKnex } = require("../data/index");

// Klant
const findKlantByUsername = (userName) => {
  return getKnex()(tables.klant).where("gebruikersnaam", userName).first();
};

const getKlantById = (id) => {
  return getKnex()(tables.klant)
    .join(
      tables.bedrijf,
      `${tables.klant}.idBedrijf`,
      "=",
      `${tables.bedrijf}.idBedrijf`
    )
    .join(
      tables.adres,
      `${tables.bedrijf}.idAdres`,
      "=",
      `${tables.adres}.idAdres`
    )
    .select("*")
    .where("idKlant", id)
    .first();
};

// Leverancier
const findLeverancierByUsername = (userName) => {
  return getKnex()(tables.leverancier)
    .where("gebruikersnaam", userName)
    .first();
};

const getLeverancierById = (id) => {
  return getKnex()(tables.leverancier)
    .join(
      tables.bedrijf,
      `${tables.leverancier}.idBedrijf`,
      "=",
      `${tables.bedrijf}.idBedrijf`
    )
    .join(
      tables.adres,
      `${tables.bedrijf}.idAdres`,
      "=",
      `${tables.adres}.idAdres`
    )
    .select("*")
    .where("idLeverancier", id)
    .first();
};

module.exports = {
  findKlantByUsername,
  findLeverancierByUsername,
  getKlantById,
  getLeverancierById,
};
