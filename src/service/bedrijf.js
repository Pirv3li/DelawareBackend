const ServiceError = require('../core/serviceError');
const bedrijfsRepo = require('../repository/bedrijf');

const getAllBedrijven = async() => {
  const items = await bedrijfsRepo.getAllBedrijven();
  return {
    items,
    count: items.length
  }
};

const getBedrijfById = async(id) => {
  const bedrijf = await bedrijfsRepo.getBedrijfById(id)
  if(!bedrijf){
    throw ServiceError.notFound(`There is no category with id ${id}.`, {id})
  }
  return bedrijf  
};

const findBedrijfByName = async(naam) => {
    const bedrijf = await bedrijfsRepo.findBedrijfByName(naam)
    if(!bedrijf){
      throw ServiceError.notFound(`There is no bedrijf with the name ${naam}.`, {naam})
    }
    return bedrijf  
  };

const createBedrijf = async ({ naam, logo, sector, iban, btwNummer, telefoonnummer, gebruikerSinds, idAdres }) => {
    //check if naam is unique by using findBedrijfByName() and show error if not
    const existingBedrijf = await bedrijfsRepo.findBedrijfByName(naam);
    if (existingBedrijf) {
        throw new Error('Bedrijf with this naam already exists');
    }
  const idBedrijf = await bedrijfsRepo.createBedrijf({ naam, logo, sector, iban, btwNummer, telefoonnummer, gebruikerSinds, idAdres })
  return await bedrijfsRepo.getBedrijfById(idBedrijf)
};

const updateBedrijfById = async (id, { naam, logo, sector, iban, btwNummer, telefoonnummer, gebruikerSinds, idAdres }) => {
  const idBedrijf = await bedrijfsRepo.updateBedrijfById(id, { naam, logo, sector, iban, btwNummer, telefoonnummer, gebruikerSinds, idAdres })
  return await bedrijfsRepo.getBedrijfById(idBedrijf)
};

const deleteBedrijfById = async (id) => {
  await bedrijfsRepo.deleteBedrijfById(id)
};

const getBedrijfByKlantId = async (id) => {
  const bedrijf = await bedrijfsRepo.getBedrijfByKlantId(id)
  if(!bedrijf){
    throw ServiceError.notFound(`There is no bedrijf with klant id ${id}.`, {id})
  }
  return bedrijf  
}

const getBedrijfByLeverancierId = async (id) => {
  const bedrijf = await bedrijfsRepo.getBedrijfByLeverancierId(id)
  if(!bedrijf){
    throw ServiceError.notFound(`There is no bedrijf with leverancier id ${id}.`, {id})
  }
  return bedrijf  
}

module.exports = {
  getAllBedrijven,
  getBedrijfById,
  findBedrijfByName,
  createBedrijf,
  updateBedrijfById,
  deleteBedrijfById,
  getBedrijfByKlantId,
  getBedrijfByLeverancierId
};