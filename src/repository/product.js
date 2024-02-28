const { tables, getKnex } = require('../data/index');

const SELECT_COLUMNS = [
  `${tables.product}.idProduct`,
  'idLeverancier',
  'naam',
  'eenheidsprijs',
  'btwtarief',
  'foto',


];


const getProducten = async() => {
  const producten = getKnex()(tables.product).select('idProduct','idLeverancier', 'naam', 'eenheidsprijs', 'btwtarief', 'foto');
  
  return producten;
  }

  const getProductById = async (id) => {
    id = Number(id);
  
    const product = await getKnex()(tables.product)
        .where('idProduct', id)
        .first(...SELECT_COLUMNS);
  
    return product;
  };

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
  createProducten,
  getProductById
};