const { tables, getKnex } = require("../data/index");

// Klant
const findKlantByUsername = (userName) => {
  return getKnex()(tables.klant).where("gebruikersnaam", userName).first();
};

const updateKlant = async (id, {username, password}) => {

  const updateData = {};
  if (username !== undefined) {
    updateData.gebruikersnaam = username;
  }
  if (password !== undefined) {
    updateData.password_hash = password;
  }
  
  if (Object.keys(updateData).length > 0) {
    await getKnex()(tables.klant)
      .where('idKlant', id)
      .update(updateData);
  }
  return { id, ...updateData };
}


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
    .where("idKlant", id);
};

// Leverancier
const findLeverancierByUsername = (userName) => {
  return getKnex()(tables.leverancier)
    .where("gebruikersnaam", userName)
    .first();
};

const findLeverancierById = (id) => {
  return getKnex()(tables.leverancier)
    .where("idLeverancier", id)
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
    .where("idLeverancier", id);
};


module.exports = {
  findKlantByUsername,
  findLeverancierByUsername,
  getKlantById,
  getLeverancierById,
  findLeverancierById,
  updateKlant,
};
