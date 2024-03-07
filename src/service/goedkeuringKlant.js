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

const getAllGoedkeuringenKlant = async(user) => {
  checkAdminOrKlantRole(user);
  const items = await goedkeuringKlantRepo.getAllGoedkeuringenKlant();
  return {
    items,
    count: items.length
  }
};

const getGoedkeuringKlantById = async(id, user) => {
  checkAdminOrKlantRole(user);
  const goedkeuringKlant = await goedkeuringKlantRepo.getGoedkeuringKlantById(id)
  if(!goedkeuringKlant){
    throw ServiceError.notFound(`There is no goedkeuringKlant with id ${id}.`, {id})
  }
  return goedkeuringKlant  
};

const createGoedkeuringKlant = async ({ klantNummer, gebruikersnaam, email, password_hash, isActief, roles, idBedrijf, idKlant }, user) => {
  checkOnlyKlantRole(user);
  const idNewGoedkeuringWijziging = await goedkeuringKlantRepo.createGoedkeuringKlant({ klantNummer, gebruikersnaam, email, password_hash, isActief, roles, idBedrijf, idKlant });
  return await goedkeuringKlantRepo.getGoedkeuringKlantById(idNewGoedkeuringWijziging);
};

const deleteGoedkeuringKlantById = async (id, user) => {
  checkAdminOrKlantRole(user);
  await goedkeuringKlantRepo.deleteGoedkeuringKlantById(id)
};

module.exports = {
  getAllGoedkeuringenKlant,
  getGoedkeuringKlantById,
  createGoedkeuringKlant,
  deleteGoedkeuringKlantById,
};