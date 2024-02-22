const { tables, getKnex } = require('../data/index');

const findByEmail = (email) => {
  return getKnex()(tables.users).where('Email', email).first();
};

module.exports = {
  findByEmail,
};