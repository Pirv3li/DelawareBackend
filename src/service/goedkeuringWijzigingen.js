const goedkeuringWijzigingenRepo = require('../repository/goedkeuringWijzigingen');
const ServiceError = require('../core/serviceError');


// ENKEL DE ADMINISTRATOR MAG DEZE REQUESTS UITVOEREN. DAAROM DAT HET VOORLOPIG NOG IN COMMENTAAR STAAT

// const checkAdminRole = (user) => {
//   if (!user || !user.roles || !user.roles.includes('admin')) {
//     throw ServiceError.forbidden(`User does not have the required admin role.`);
//   }
// };

const getAllGoedkeuringWijzigingen = async(/*user*/) => {
  //checkAdminRole(user);
  const items = await goedkeuringWijzigingenRepo.getAllGoedkeuringWijzigingen();
  return {
    items,
    count: items.length
  }
};

const getGoedkeuringWijzigingById = async(id, /*user*/) => {
  //checkAdminRole(user);
  const goedkeuringWijziging = await goedkeuringWijzigingenRepo.getGoedkeuringWijzigingById(id)
  if(!goedkeuringWijziging){
    throw ServiceError.notFound(`There is no goedkeuringWijziging with id ${id}.`, {id})
  }
  return goedkeuringWijziging  
};

const createGoedkeuringWijziging = async ({ gebruikerNummer, gebruikersnaam, email, password_hash, isActief, roles, idBedrijf }, /*user*/) => {
  //checkAdminRole(user);
  const idNewGoedkeuringWijziging = await goedkeuringWijzigingenRepo.createGoedkeuringWijziging({ gebruikerNummer, gebruikersnaam, email, password_hash, isActief, roles, idBedrijf });
  return await goedkeuringWijzigingenRepo.getGoedkeuringWijzigingById(idNewGoedkeuringWijziging);
};

const deleteGoedkeuringWijzigingById = async (id, /*user*/) => {
  //checkAdminRole(user);
  await goedkeuringWijzigingenRepo.deleteGoedkeuringWijzigingById(id)
};

module.exports = {
  getAllGoedkeuringWijzigingen,
  getGoedkeuringWijzigingById,
  createGoedkeuringWijziging,
  deleteGoedkeuringWijzigingById,
};