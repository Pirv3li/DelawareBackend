const ServiceError = require('../core/serviceError');
const adresRepo = require('../repository/adres');

const getAllAdressen = async() => {
  const items = await adresRepo.getAllAdressen();
  return {
    items,
    count: items.length
  }
};


const getAdresById = async(id) => {
  const adres = await adresRepo.getAdresById(id)
  if(!adres){
    throw ServiceError.notFound(`There is no adres with id ${id}.`, {id})
  }
  return adres  
};

const createAdres = async ({ straat, nummer, stad, postcode, laatstGebruikt }) => {
  const idNewAdres = await adresRepo.createAdres({ straat, nummer, stad, postcode, laatstGebruikt })
  return await adresRepo.getAdresById(idNewAdres)
};

const updateAdresById = async (id, { straat, nummer, stad, postcode, laatstGebruikt }) => {
  const idAdres = await adresRepo.updateAdresById(id, { straat, nummer, stad, postcode, laatstGebruikt })
  return await adresRepo.getAdresById(idAdres)
};

const deleteAdresById = async (id) => {
  await adresRepo.deleteAdresById(id)
};

module.exports = {
  getAllAdressen,
  getAdresById,
  createAdres,
  updateAdresById,
  deleteAdresById,
};