const ServiceError = require("../core/serviceError");
const bedrijfsRepo = require("../repository/bedrijf");
const repoUsers = require("../repository/users")
const repoAdres = require("../repository/adres")

const getAllBedrijven = async () => {
  const items = await bedrijfsRepo.getAllBedrijven();
  return {
    items,
    count: items.length,
  };
};

const getBedrijfById = async (id) => {
  const bedrijf = await bedrijfsRepo.getBedrijfById(id);
  if (!bedrijf) {
    throw ServiceError.notFound(`There is no category with id ${id}.`, { id });
  }

  return bedrijf;
};

const findBedrijfByName = async (naam) => {
  const bedrijf = await bedrijfsRepo.findBedrijfByName(naam);
  if (!bedrijf) {
    throw ServiceError.notFound(`There is no bedrijf with the name ${naam}.`, {
      naam,
    });
  }
  return bedrijf;
};

const createBedrijf = async ({
  naam,
  logo,
  sector,
  iban,
  btwNummer,
  email,
  telefoonnummer,
  gebruikerSinds,
  idAdres,
}) => {
  //check if naam is unique by using findBedrijfByName() and show error if not
  const existingBedrijf = await bedrijfsRepo.findBedrijfByName(naam);
  if (existingBedrijf) {
    throw new Error("Bedrijf with this naam already exists");
  }
  const idBedrijf = await bedrijfsRepo.createBedrijf({
    naam,
    logo,
    sector,
    iban,
    btwNummer,
    email,
    telefoonnummer,
    gebruikerSinds,
    idAdres,
  });
  return await bedrijfsRepo.getBedrijfById(idBedrijf);
};

const updateBedrijfById = async (idLeverancier, idKlant, idBedrijf, updates) => {
  const leverancier = idLeverancier ? await repoUsers.findLeverancierById(idLeverancier) : null;
  const klant = idKlant ? await repoUsers.getKlantById(idKlant) : null;
  const bedrijf = await bedrijfsRepo.getBedrijfById(idBedrijf);
  
  
  if ((klant && klant.idBedrijf !== idBedrijf) && (leverancier && leverancier.idBedrijf !== idBedrijf)) {

    throw ServiceError.unauthorized("Unauthorized");
  }
  
  const bedrijfUpdates = {};
  if (updates && updates.naam) {
    bedrijfUpdates.naam = updates.naam;
  }

  if (updates && updates.logo) {
    bedrijfUpdates.logo = updates.logo;
  }

  if (updates && updates.sector) {
    bedrijfUpdates.sector = updates.sector;
  }

  if (updates && updates.iban) {
    bedrijfUpdates.iban = updates.iban;
  }

  if (updates && updates.btwNummer) {
    bedrijfUpdates.btwNummer = updates.btwNummer;
  }

  if (updates && updates.email) {
    bedrijfUpdates.email = updates.email;
  }

  if (updates && updates.telefoonnummer) {
    bedrijfUpdates.telefoonnummer = updates.telefoonnummer;
  }

  const updatedBedrijf = await bedrijfsRepo.updateBedrijfById(idBedrijf, bedrijfUpdates);
  if (updates.adres) {
    const adres  = updates.adres;
    await repoAdres.createAdres(bedrijf.Adres.idAdres, adres);
  }

  return updatedBedrijf;
};

const deleteBedrijfById = async (id) => {
  await bedrijfsRepo.deleteBedrijfById(id);
};

const getBedrijfByKlantId = async (id) => {
  const bedrijf = await bedrijfsRepo.getBedrijfByKlantId(id);
  if (!bedrijf) {
    throw ServiceError.notFound(`There is no bedrijf with klant id ${id}.`, {
      id,
    });
  }
  return bedrijf;
};

const getBedrijfByLeverancierId = async (id) => {
  const bedrijf = await bedrijfsRepo.getBedrijfByLeverancierId(id);
  if (!bedrijf) {
    throw ServiceError.notFound(
      `There is no bedrijf with leverancier id ${id}.`,
      { id }
    );
  }
  return bedrijf;
};

module.exports = {
  getAllBedrijven,
  getBedrijfById,
  findBedrijfByName,
  createBedrijf,
  updateBedrijfById,
  deleteBedrijfById,
  getBedrijfByKlantId,
  getBedrijfByLeverancierId,
};
