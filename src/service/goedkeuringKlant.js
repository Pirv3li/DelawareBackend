const goedkeuringKlantRepo = require("../repository/goedkeuringKlant");
const ServiceError = require("../core/serviceError");
const { hashPassword } = require("../core/password");

const checkAdminOrKlantRole = (role) => {
  if (!role || (!role.includes("admin") && !role.includes("klant"))) {
    throw ServiceError.forbidden(
      `User does not have the required admin or Klant role.`
    );
  }
};

const checkOnlyKlantRole = (role) => {
  if (!role || !role.includes("klant")) {
    throw ServiceError.forbidden(`User does not have the required Klant role.`);
  }
};

const checkKlantId = (idKlant, id) => {
  if (idKlant !== id) {
    throw ServiceError.forbidden(
      `User does not have permission to access or modify this data.`
    );
  }
};

const getLaatsteWijziging = async (session) => {
  checkAdminOrKlantRole(session.roles);
  const laatsteWijziging = await goedkeuringKlantRepo.getLaatsteWijziging(
    session.idKlant
  );
  return laatsteWijziging;
};

const getAllGoedkeuringenKlant = async (session) => {
  checkAdminOrKlantRole(session.roles);
  const items = await goedkeuringKlantRepo.getAllGoedkeuringenKlant(
    session.idKlant
  );
  if (items.length === 0) {
    throw ServiceError.notFound(`There are no requests for this leverancier.`);
  }
  items.forEach((item) => {
    checkKlantId(item.idKlant, session.idKlant);
  });
  return {
    items,
    count: items.length,
  };
};

const getGoedkeuringKlantById = async (id, session) => {
  checkAdminOrKlantRole(session.roles);
  const goedkeuringKlant = await goedkeuringKlantRepo.getGoedkeuringKlantById(
    id
  );
  if (!goedkeuringKlant) {
    throw ServiceError.notFound(`There is no goedkeuringKlant with id ${id}.`, {
      id,
    });
  }
  checkKlantId(goedkeuringKlant.idKlant, session.idKlant);
  return goedkeuringKlant;
};

const createGoedkeuringKlant = async (
  {
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
  },
  session
) => {
  checkOnlyKlantRole(session.roles);
  
  const idNewGoedkeuringWijziging =
    await goedkeuringKlantRepo.createGoedkeuringKlant({
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
      afgehandeld: 'in behandeling',
      datumAanvraag: new Date(),
    });
  checkKlantId(idKlant, session.idKlant);
  return await goedkeuringKlantRepo.getGoedkeuringKlantById(
    idNewGoedkeuringWijziging
  );
};

const deleteGoedkeuringKlantById = async (id, session) => {
  checkAdminOrKlantRole(session.roles);
  const goedkeuringKlant = await goedkeuringKlantRepo.getGoedkeuringKlantById(
    id
  );
  if (!goedkeuringKlant) {
    throw ServiceError.notFound(`There is no goedkeuringKlant with id ${id}.`, {
      id,
    });
  }
  checkKlantId(goedkeuringKlant.idKlant, session.idKlant);
  await goedkeuringKlantRepo.deleteGoedkeuringKlantById(id);
};

module.exports = {
  getLaatsteWijziging,
  getAllGoedkeuringenKlant,
  getGoedkeuringKlantById,
  createGoedkeuringKlant,
  deleteGoedkeuringKlantById,
};
