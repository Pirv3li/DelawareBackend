const { shutdownData, getKnex, tables } = require("../src/data");

module.exports = async () => {
  // Remove any leftover data
  await getKnex()(tables.leverancier).delete();
  await getKnex()(tables.klant).delete();

  // Close database connection
  await shutdownData();
};
