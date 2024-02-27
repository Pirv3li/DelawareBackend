const { tables, getKnex } = require('../data/index');

// Klant
const findKlantByUsername = (userName) => {
  return getKnex()(tables.klant).where('gebruikersnaam', userName).first();
};

const getKlantById = (id) => {
  return getKnex()(tables.klant).where('idKlant', id).first();
}

// Leverancier 
const findLeverancierByUsername = (userName) => {
  return getKnex()(tables.leverancier).where('gebruikersnaam', userName).first();
};

const getLeverancierById = (id) => {
  return getKnex()(tables.leverancier).where('idLeverancier', id).first();
}

module.exports = {
  findKlantByUsername,
  findLeverancierByUsername,
  getKlantById,
  getLeverancierById,
};