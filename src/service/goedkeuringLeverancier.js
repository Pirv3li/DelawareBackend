const goedkeuringLeverancierRepo = require('../repository/goedkeuringLeverancier');
const ServiceError = require('../core/serviceError');


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

const getAllGoedkeuringenLeverancier = async(role) => {
  checkAdminOrLeverancierRole(role);
  const items = await goedkeuringLeverancierRepo.getAllGoedkeuringenLeverancier();
  return {
    items,
    count: items.length
  }
};

const getGoedkeuringLeverancierById = async(id, role) => {
  checkAdminOrLeverancierRole(role);
  const goedkeuringWijziging = await goedkeuringLeverancierRepo.getGoedkeuringLeverancierById(id)
  if(!goedkeuringWijziging){
    throw ServiceError.notFound(`There is no goedkeuringWijziging with id ${id}.`, {id})
  }
  return goedkeuringWijziging  
};

const createGoedkeuringLeverancier = async ({ leverancierNummer, gebruikersnaam, email, password_hash, isActief, roles, idBedrijf, idLeverancier }, role) => {
  checkOnlyLeverancierRole(role);
  const idNewGoedkeuringWijziging = await goedkeuringLeverancierRepo.createGoedkeuringLeverancier({ leverancierNummer, gebruikersnaam, email, password_hash, isActief, roles, idBedrijf, idLeverancier });
  return await goedkeuringLeverancierRepo.getGoedkeuringLeverancierById(idNewGoedkeuringWijziging);
};

const deleteGoedkeuringLeverancierById = async (id, role) => {
  checkAdminOrLeverancierRole(role);
  await goedkeuringLeverancierRepo.deleteGoedkeuringLeverancierById(id)
};

module.exports = {
  getAllGoedkeuringenLeverancier,
  getGoedkeuringLeverancierById,
  createGoedkeuringLeverancier,
  deleteGoedkeuringLeverancierById,
};