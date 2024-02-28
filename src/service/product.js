const repoProducten = require("../repository/product");

const getProducten = async () => {
  try {
    const producten = repoProducten.getProducten();
    return producten;
  } catch (error) {
    throw new Error("Error while fetching producten");
  }
};

const getProductByID = async (id) => {
  const product = await repoProducten.getProductById(id);

  if (!product) {
    throw ServiceError.notFound(`Geen product met id: ${id} werd gevonden`);
  }

  return product;
};

const createProducten = async (
  idLeverancier,
  foto,
  naam,
  eenheidsprijs,
  btwtarief,
  aantal,
  gewicht,
  beschrijving
) => {
  // try {
  const createdProd = await repoProducten.createProducten(
    idLeverancier,
    foto,
    naam,
    eenheidsprijs,
    btwtarief,
    aantal,
    gewicht,
    beschrijving
  );

  return repoProducten.getProductById(createdProd);

  // } catch (error) {
  //   throw new Error("Error while adding product");
  // }
};

module.exports = {
  getProducten,
  createProducten,
  getProductByID,
};
