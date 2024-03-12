const ServiceError = require("../core/serviceError");
const repoProducten = require("../repository/product");

const getProducten = async () => {
  try {
    const producten = repoProducten.getProducten();
    return producten;
  } catch (error) {
    throw new Error("Error while fetching producten");
  }
};



const getProductenLimit = async (begin) => {

  try {
    const producten = repoProducten.getProductenLimit(begin);
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
  categorie,
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
      categorie,
      beschrijving
    );

    return repoProducten.getProductById(createdProd);
  } catch (error) {
    throw new Error("Error while adding product");
  }
};

const updateProduct = async (idProduct, idLeverancier, updates) => {
  const prodUpdates = {};
  const product = await repoProducten.getProductById(idProduct);
  if (!product) {
    throw ServiceError.notFound("No product found");
  }

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
    if (updates.idLeverancier !== idLeverancier) {
      throw ServiceError.isForbidden("Permission denied");
    }
    const updatedProd = await repoProducten.updateProduct(
      idProduct,
      prodUpdates
    );

    return updatedProd;
  } catch (error) {
    throw handleDBError(error);
  }
};

const deleteProduct = async (idLeverancier, idProduct) => {
  const product = await repoProducten.getProductById(idProduct);
  if (!product) {
    throw ServiceError.notFound("No product found");
  }

  try {
    if (idLeverancier !== product.idLeverancier) {
      throw new Error("Permission denied");
    } else {
      const deletedProduct = await repoProducten.deleteProduct(idProduct);
      if (!deletedProduct) {
        getLogger().error(`Product not found`);
        throw ServiceError.notFound("Product not found");
      }
      return { message: "Product deleted" };
    }
  } catch (error) {
    getLogger().error(`Error deleting user`);
    throw handleDBError(error);
  }
};

const getDistinctCategories = async () => {
  try {
    const categories = await repoProducten.getDistinctCategories();
    return categories;
  } catch (error) {
    throw new Error("Error while fetching distinct categories");
  }
};

module.exports = {
  getProducten,
  createProducten,
  getProductByID,
  updateProduct,
  deleteProduct,
  getDistinctCategories,
  getProductenLimit
};
