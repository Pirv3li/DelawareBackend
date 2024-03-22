const ServiceError = require("../core/serviceError");
const bedrijfsRepo = require("../repository/bedrijf");
const repoUsers = require("../repository/users")
const repoAdres = require("../repository/adres")


const getBedrijfByKlantId = async (idKlant, id) => {
  const user = await repoUsers.getKlantById(idKlant)
  const bedrijf = await bedrijfsRepo.getBedrijfByKlantId(id);
  
  if (!bedrijf) {
    throw ServiceError.notFound(`There is no bedrijf with klant id ${id}.`, {
      id,
    });
  }
  
  if (user[0].idBedrijf !== bedrijf.idBedrijf) {
    throw ServiceError.unauthorized(`Permission denied`);
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

  getBedrijfByKlantId,
  getBedrijfByLeverancierId,
};
