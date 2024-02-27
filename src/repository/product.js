const { tables, getKnex } = require('../data/index');

const getProducten = async() => {
  const producten = getKnex()(tables.product).select('idProduct','idLeverancier', 'naam', 'eenheidsprijs', 'btwtarief', 'foto');
  
  return producten;
  }

const createProducten = async (leverID,  picture, prodName, unitprice, taxprice) => {
  const product = {
    idLeverancier: leverID,
    foto: picture,
    naam: prodName,
    eenheidsprijs: unitprice,
    btwtarief: taxprice
  };
  
  const [productID] = await getKnex()(tables.product).insert(product);
  return productID;
};
  

module.exports = {
  getProducten,
  createProducten
};