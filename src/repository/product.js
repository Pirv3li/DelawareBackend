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
  const product = {
    idLeverancier,
    foto,
    naam,
    eenheidsprijs,
    btwtarief,
    aantal,
    gewicht,
    beschrijving,
  };

  const [idProduct] = await getKnex()(tables.product).insert(product);

  return idProduct;
};

module.exports = {
  getProducten,
  createProducten,
  getProductById,
};
