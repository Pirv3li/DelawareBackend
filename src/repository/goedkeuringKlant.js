const { getKnex, tables } = require("../data");

const COLUMNS = [
  "idGoedkeuringKlant",
  "idKlant",
  "klantNummer",
  "gebruikersnaam",
  "email",
  "isActief",
  "roles",
  "iban",
  "btwNummer",
  "telefoonnummer",
  "sector",
  "straat",
  "nummer",
  "stad",
  "postcode",
  "afgehandeld",
  "datumAanvraag",
];

const getLaatsteWijziging = async (idKlant) => {
  const goedkeuringenKlant = await getKnex()(tables.goedkeuringklant)
    .where("idKlant", idKlant)
    .select("datumAanvraag", "afgehandeld")
    .orderBy("datumAanvraag", "desc")
    .first();
  return goedkeuringenKlant;
};

const getAllGoedkeuringenKlant = async (idKlant) => {
  const goedkeuringKlant = await getKnex()(tables.goedkeuringklant)
    .where("idKlant", idKlant)
    .select(COLUMNS)
    .orderBy("datumAanvraag", "desc");
  return goedkeuringKlant;
};

const getGoedkeuringKlantById = async (id) => {
  const goedkeuringKlant = await getKnex()(tables.goedkeuringklant)
    .where("idGoedkeuringKlant", id)
    .select(COLUMNS)
    .first();
  return goedkeuringKlant;
};

const createGoedkeuringKlant = async ({
  idKlant,
  klantNummer,
  gebruikersnaam,
  email,
  isActief,
  roles,
  iban,
  btwNummer,
  telefoonnummer,
  sector,
  straat,
  nummer,
  stad,
  postcode,
  afgehandeld,
  datumAanvraag,
}) => {
  const [id] = await getKnex()(tables.goedkeuringklant).insert({
    idKlant,
    klantNummer,
    gebruikersnaam,
    email,
    isActief,
    roles: JSON.stringify(roles),
    iban,
    btwNummer,
    telefoonnummer,
    sector,
    straat,
    nummer,
    stad,
    postcode,
    afgehandeld,
    datumAanvraag,
  });
  return id;
};

const deleteGoedkeuringKlantById = async (id) => {
  await getKnex()(tables.goedkeuringklant)
    .where("idGoedkeuringKlant", id)
    .del();
};

module.exports = {
  getLaatsteWijziging,
  getAllGoedkeuringenKlant,
  getGoedkeuringKlantById,
  createGoedkeuringKlant,
  deleteGoedkeuringKlantById,
};
