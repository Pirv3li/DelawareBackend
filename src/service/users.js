const userRepository = require("../repository/users");
const { verifyPassword, hashPassword } = require("../core/password");
const { generateJWT, verifyJWT } = require("../core/jwt");
const ServiceError = require("../core/serviceError");
const { getLogger } = require("../core/logging");

const makeExposedUser = ({
  idKlant,
  klantNummer,
  idLeverancier,
  leverancierNummer,
  gebruikersnaam,
  isActief,
  roles,
}) => ({
  idKlant,
  klantNummer,
  idLeverancier,
  leverancierNummer,
  gebruikersnaam,
  isActief,
  roles,
});

const makeExposedKlant = ({
  idKlant,
  klantNummer,
  gebruikersnaam,
  email,
  isActief,
  roles,
  idBedrijf,
  naam,
  logo,
  sector,
  iban,
  btwNummer,
  telefoonnummer,
  gebruikerSinds,
  idAdres,
  straat,
  nummer,
  postcode,
  stad,
}) => ({
  klant: {
    idKlant,
    klantNummer,
    gebruikersnaam,
    email,
    isActief,
    roles,
    bedrijf: {
      idBedrijf,
      naam,
      logo,
      sector,
      iban,
      btwNummer,
      telefoonnummer,
      gebruikerSinds,
      adres: { idAdres, straat, nummer, postcode, stad },
    },
  },
});

const makeExposedLeverancier = ({
  idLeverancier,
  leverancierNummer,
  gebruikersnaam,
  email,
  isActief,
  roles,
  idBedrijf,
  naam,
  logo,
  sector,
  iban,
  btwNummer,
  telefoonnummer,
  gebruikerSinds,
  idAdres,
  straat,
  nummer,
  postcode,
  stad,
}) => ({
  leverancier: {
    idLeverancier,
    leverancierNummer,
    gebruikersnaam,
    email,
    isActief,
    roles,
    bedrijf: {
      idBedrijf,
      naam,
      logo,
      sector,
      iban,
      btwNummer,
      telefoonnummer,
      gebruikerSinds,
      adres: { idAdres, straat, nummer, postcode, stad },
    },
  },
});

const makeLoginData = async (user) => {
  const token = await generateJWT(user);
  return {
    user: makeExposedUser(user),
    token,
  };
};

const checkAndParseSession = async (authHeader) => {
  if (!authHeader) {
    throw ServiceError.unauthorized("You need to be signed in");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw ServiceError.unauthorized("Invalid authentication token");
  }

  const authToken = authHeader.substring(7);
  try {
    const { roles, idKlant, idLeverancier } = await verifyJWT(authToken);

    return {
      idKlant,
      idLeverancier,
      roles,
      authToken,
    };
  } catch (error) {
    getLogger().error(error.message, { error });
    throw new Error(error.message);
  }
};

// klant
const loginKlant = async (userName, password) => {
  const user = await userRepository.findKlantByUsername(userName);
  if (!user) {
    throw ServiceError.unauthorized(
      "The given username and password do not match"
    );
  }

  const passwordValid = await verifyPassword(password, user.password_hash);

  if (!passwordValid) {
    throw ServiceError.unauthorized(
      "The given email and password do not match"
    );
  }
  return await makeLoginData(user);
};

const getKlantById = async (id) => {
  const klant = await userRepository.getKlantById(id);
  const exposedKlant = klant.map(makeExposedKlant);
  return exposedKlant;
};

const deleteKlant = async (id) => {
  const deleteKlant = await userRepository.deleteKlantById(id);
  return deleteKlant;
}

// Leverancier
const deleteLeverancier = async (id) => {
  const deleteLeverancier = await userRepository.deleteLeverancierById(id);
  return deleteLeverancier;
}

const loginLeverancier = async (userName, password) => {
  const user = await userRepository.findLeverancierByUsername(userName);
  if (!user) {
    throw ServiceError.unauthorized(
      "The given username and password do not match"
    );
  }

  const passwordValid = await verifyPassword(password, user.password_hash);

  if (!passwordValid) {
    throw ServiceError.unauthorized(
      "The given email and password do not match"
    );
  }
  return await makeLoginData(user);
};

const getLeverancierById = async (id) => {
  const leverancier = await userRepository.getLeverancierById(id);
  const exposedLeverancier = leverancier.map(makeExposedLeverancier);
  return exposedLeverancier;
};

const checkRole = (role, roles) => {
  const hasPermission = roles.includes(role);

  if (!hasPermission) {
    throw ServiceError.forbidden(
      "You are not allowed to view this part of the application"
    );
  }
};

const updateKlant = async (id, body) => {
  if(body.password != undefined) {
  body.password = await hashPassword(body.password);
  };
  const updatedKlant = await userRepository.updateKlant(id, body);
  return updatedKlant;
}

const updateLeverancier = async (id, body) => {
  if(body.password != undefined) {
  body.password = await hashPassword(body.password);
  };
  const updateLeverancier = await userRepository.updateLeverancier(id, body);
  return updateLeverancier;
}

module.exports = {
  loginLeverancier,
  loginKlant,
  checkAndParseSession,
  getKlantById,
  getLeverancierById,
  checkRole,
  updateKlant,
  updateLeverancier,
  deleteKlant,
  deleteLeverancier,
};
