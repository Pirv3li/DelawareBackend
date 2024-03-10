const { tables, getKnex } = require("../data/index");

const SELECT_COLUMNS = [
  `${tables.product}.idProduct`,
  "idLeverancier",
  "naam",
  "eenheidsprijs",
  "btwtarief",
  "foto",
  "aantal",
  "gewicht",
  "beschrijving",
  "categorie",
];

const getProducten = async () => {
  const producten = getKnex()(tables.product).select(...SELECT_COLUMNS);

  return producten;
};

const getProductById = async (id) => {
  id = Number(id);

  const product = await getKnex()(tables.product)
    .where("idProduct", id)
    .first(...SELECT_COLUMNS);

  return product;
};

const getDistinctCategories = async () => {
  const categories = await getKnex()("sdp2backend.product").distinct(
    "categorie"
  );

  return categories.map((categoryObj) => categoryObj.categorie);
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
  const product = {
    idLeverancier,
    foto,
    naam,
    eenheidsprijs,
    btwtarief,
    aantal,
    gewicht,
    categorie,
    beschrijving,
  };

  const [idProduct] = await getKnex()(tables.product).insert(product);

  return idProduct;
};

const updateProduct = async (idProduct, updateData) => {
  const updatedFields = {};

  if (updateData.foto) {
    updatedFields.foto = updateData.foto;
  }

  if (updateData.naam) {
    updatedFields.naam = updateData.naam;
  }

  if (updateData.eenheidsprijs) {
    updatedFields.eenheidsprijs = updateData.eenheidsprijs;
  }

  if (updateData.btwtarief) {
    updatedFields.btwtarief = updateData.btwtarief;
  }

  if (updateData.aantal) {
    updatedFields.aantal = updateData.aantal;
  }

  if (updateData.gewicht) {
    updatedFields.gewicht = updateData.gewicht;
  }

  if (updateData.beschrijving) {
    updatedFields.beschrijving = updateData.beschrijving;
  }

  await getKnex()(tables.product)
    .where("idProduct", idProduct)
    .update(updatedFields);

  const updatedProduct = await getKnex()(tables.product)
    .where("idProduct", idProduct)
    .first();

  return updatedProduct;
};

const deleteProduct = async (idProduct) => {
  const deletedProduct = await getKnex()(tables.product)
    .where("idProduct", idProduct)
    .delete();

  return deletedProduct;
};

module.exports = {
  getProducten,
  createProducten,
  getProductById,
  updateProduct,
  deleteProduct,
  getDistinctCategories,
};
