const goedkeuringLeverancierRepo = require('../repository/goedkeuringLeverancier');
const ServiceError = require('../core/serviceError');
const { hashPassword } = require("../core/password");


// ENKEL DE ADMINISTRATOR MAG DEZE REQUESTS UITVOEREN. DAAROM DAT HET VOORLOPIG NOG IN COMMENTAAR STAAT

const checkAdminOrLeverancierRole = (role) => {
  if (!role || (!role.includes('admin') && !role.includes('leverancier'))) {
    throw ServiceError.forbidden(`User does not have the required admin or leverancier role.`);
  }
};

const checkOnlyLeverancierRole = (role) => {
  if (!role || !role.includes('leverancier')) {
    throw ServiceError.forbidden(`User does not have the required leverancier role.`);
  }
};

const checkLeverancierId = (idLeverancier, id) => {
  if (idLeverancier !== id) {
    throw ServiceError.forbidden(`User does not have permission to access or modify this data.`);
  }
}

const getLaatsteWijziging = async(session) => {
  checkAdminOrLeverancierRole(session.roles);
  const laatsteWijziging = await goedkeuringLeverancierRepo.getLaatsteWijziging(session.idLeverancier);
  return laatsteWijziging;
}

const getAllGoedkeuringenLeverancier = async(session) => {
  checkAdminOrLeverancierRole(session.roles);
  const items = await goedkeuringLeverancierRepo.getAllGoedkeuringenLeverancier(session.idLeverancier);
  if (items.length === 0) {
    throw ServiceError.notFound(`There are no requests for this leverancier.`);
  }
  items.forEach(item => {
    checkLeverancierId(item.idLeverancier, session.idLeverancier);
  });
  return {
    items,
    count: items.length
  }
};

const getGoedkeuringLeverancierById = async(id, session) => {
  checkAdminOrLeverancierRole(session.roles);
  const goedkeuringWijziging = await goedkeuringLeverancierRepo.getGoedkeuringLeverancierById(id)
  if(!goedkeuringWijziging){
    throw ServiceError.notFound(`There is no goedkeuringWijziging with id ${id}.`, {id})
  }
  checkLeverancierId(goedkeuringWijziging.idLeverancier, session.idLeverancier);
  return goedkeuringWijziging  
};

const createGoedkeuringLeverancier = async ({
  idLeverancier,
  leverancierNummer,
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
}, session) => {
  checkOnlyLeverancierRole(session.roles);
  
  const idNewGoedkeuringWijziging = await goedkeuringLeverancierRepo.createGoedkeuringLeverancier({
    idLeverancier,
    leverancierNummer,
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
  checkLeverancierId(idLeverancier, session.idLeverancier)
  return await goedkeuringLeverancierRepo.getGoedkeuringLeverancierById(idNewGoedkeuringWijziging);
};

const deleteGoedkeuringLeverancierById = async (id, session) => {
  checkAdminOrLeverancierRole(session.roles);
  const goedkeuringLeverancier = await goedkeuringLeverancierRepo.getGoedkeuringLeverancierById(id);
  if (!goedkeuringLeverancier) {
    throw ServiceError.notFound(`There is no goedkeuringLeverancier with id ${id}.`, {id});
  }
  checkLeverancierId(goedkeuringLeverancier.idLeverancier, session.idLeverancier);
  await goedkeuringLeverancierRepo.deleteGoedkeuringLeverancierById(id);
};

module.exports = {
  getLaatsteWijziging,
  getAllGoedkeuringenLeverancier,
  getGoedkeuringLeverancierById,
  createGoedkeuringLeverancier,
  deleteGoedkeuringLeverancierById,
};