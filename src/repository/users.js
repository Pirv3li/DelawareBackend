const { tables, getKnex } = require('../data/index');

const findKlantByUsername = (userName) => {
  return getKnex()(tables.klant).where('gebruikersnaam', userName).first();
};

const findLeverancierByUsername = (userName) => {
  return getKnex()(tables.leverancier).where('gebruikersnaam', userName).first();
};

module.exports = {
  findKlantByUsername,
  findLeverancierByUsername,
};