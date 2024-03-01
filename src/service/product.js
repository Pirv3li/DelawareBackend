const repoProducten = require("../repository/product");
const repoUsers = require('../repository/users')

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
  try {
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

  } catch (error) {
    throw new Error("Error while adding product");
  }
}

const updateProduct = async (idProduct, idLeverancier, updates) => {
  const prodUpdates = {};

  if (updates.foto) {
    prodUpdates.foto = updates.foto;
  }

  if (updates.naam) {
    prodUpdates.naam = updates.naam;
  }

  if (updates.eenheidsprijs) {
    prodUpdates.eenheidsprijs = updates.eenheidsprijs;
  }

  if (updates.btwtarief) {
    prodUpdates.btwtarief = updates.btwtarief;
  }

  if (updates.aantal) {
    prodUpdates.aantal = updates.aantal;
  }

  if (updates.gewicht) {
    prodUpdates.gewicht = updates.gewicht;
  }

  if (updates.beschrijving) {
    prodUpdates.beschrijving = updates.beschrijving;
  }
  try {
    if (
      updates.idLeverancier !== idLeverancier
    ) {
      throw new Error("Permission denied");
    }

    const updatedProd = await repoProducten.updateProduct(idProduct, idLeverancier, prodUpdates);

    return updatedProd

  } catch (error) {
    throw handleDBError(error);
  }
};

module.exports = {
  getProducten,
  createProducten,
  getProductByID,
  updateProduct
};
