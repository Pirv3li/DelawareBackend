const { shutdownData, getKnex, tables } = require('../src/data'); 

module.exports = async () => {
  // Remove any leftover data 
  await getKnex()(tables.gebruiker).delete(); 

  // Close database connection
  await shutdownData(); 
};
