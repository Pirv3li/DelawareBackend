const goedkeuringKlantRepo = require('../repository/goedkeuringKlant');
const ServiceError = require('../core/serviceError');


// ENKEL DE ADMINISTRATOR MAG DEZE REQUESTS UITVOEREN. DAAROM DAT HET VOORLOPIG NOG IN COMMENTAAR STAAT

const checkAdminOrKlantRole = (role) => {
  if (!role || (!role.includes('admin') && !role.includes('klant'))) {
    throw ServiceError.forbidden(`User does not have the required admin or Klant role.`);
  }
};

const checkOnlyKlantRole = (role) => {
  if (!role || !role.includes('klant')) {
    throw ServiceError.forbidden(`User does not have the required Klant role.`);
  }
};

const checkKlantId = (idKlant, id) => {
  if (idKlant !== id) {
    throw ServiceError.forbidden(`User does not have permission to access or modify this data.`);
  }
}

const getAllGoedkeuringenKlant = async(session) => {
  checkAdminOrKlantRole(session.roles);
  const items = await goedkeuringKlantRepo.getAllGoedkeuringenKlant(session.idKlant);
  items.forEach(item => {
    checkKlantId(item.idKlant, session.idKlant);
  });
  return {
    items,
    count: items.length
  }
};

const getGoedkeuringKlantById = async(id, session) => {
  checkAdminOrKlantRole(session.roles);
  const goedkeuringKlant = await goedkeuringKlantRepo.getGoedkeuringKlantById(id)
  if(!goedkeuringKlant){
    throw ServiceError.notFound(`There is no goedkeuringKlant with id ${id}.`, {id})
  }
  checkKlantId(goedkeuringKlant.idKlant, session.idKlant);
  return goedkeuringKlant  
};

const createGoedkeuringKlant = async ({ klantNummer, gebruikersnaam, email, password_hash, isActief, roles, idBedrijf, idKlant }, session) => {
  checkOnlyKlantRole(session.roles);
  const idNewGoedkeuringWijziging = await goedkeuringKlantRepo.createGoedkeuringKlant({ klantNummer, gebruikersnaam, email, password_hash, isActief, roles, idBedrijf, idKlant });
  checkKlantId(idKlant, session.idKlant)
  return await goedkeuringKlantRepo.getGoedkeuringKlantById(idNewGoedkeuringWijziging);
};

const deleteGoedkeuringKlantById = async (id, session) => {
  checkAdminOrKlantRole(session.roles);
  const goedkeuringKlant = await goedkeuringKlantRepo.getGoedkeuringKlantById(id);
  if (!goedkeuringKlant) {
    throw ServiceError.notFound(`There is no goedkeuringKlant with id ${id}.`, {id});
  }
  checkKlantId(goedkeuringKlant.idKlant, session.idKlant);
  await goedkeuringKlantRepo.deleteGoedkeuringKlantById(id)
};

module.exports = {
  getAllGoedkeuringenKlant,
  getGoedkeuringKlantById,
  createGoedkeuringKlant,
  deleteGoedkeuringKlantById,
};