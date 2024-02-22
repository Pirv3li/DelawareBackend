const { tables, getKnex } = require('../data/index');

const findByUsername = (userName) => {
  return getKnex()(tables.user).where('gebruikersnaam', userName).first();
};

module.exports = {
  findByUsername,
};