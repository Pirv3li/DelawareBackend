const repoProducten = require('../repository/product');



const getProducten = async () => {
  try {
    const producten = repoProducten.getProducten();
    return producten;
  } catch (error) {
    throw new Error('Error while fetching producten');
  }
};

const getProductByID = async (id) => {
  const product = await repoProducten.getProductById(id);

  if (!product) {
    throw ServiceError.notFound(`Geen product met id: ${id} werd gevonden`);
  }

  return product
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
  createProducten,
  getProductByID
};