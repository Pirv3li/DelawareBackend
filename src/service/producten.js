const repoProducten = require('../repository/producten');



const getProducten = async () => {
  try {
    const producten = repoProducten.getProducten();
    return producten;
  } catch (error) {
    throw new Error('Error while fetching producten');
  }
};


const createProducten = async (leverID, picture, prodName, unitprice, taxprice ) => {
  try {
    const createdProd = await repoProducten.createProduct(leverID, picture, prodName, unitprice, taxprice);

    return { id: createdProd };
  } catch (error) {
    throw new Error('Error while adding product');
  }
};




module.exports = {
  getProducten,
  createProducten
};