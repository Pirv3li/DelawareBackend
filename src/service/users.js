const userRepository = require('../repository/users');
const {verifyPassword} = require('../core/password');
const { generateJWT, verifyJWT } = require('../core/jwt'); 
const ServiceError = require('../core/serviceError');
const { getLogger } = require('../core/logging'); 

const makeExposedUser = ({ idKlant, klantNummer, idLeverancier, leverancierNummer, gebruikersnaam, isActief, roles }) => ({
  idKlant,
  klantNummer,
  idLeverancier,
  leverancierNummer,
  gebruikersnaam,
  isActief,
  roles,
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
    throw ServiceError.unauthorized('You need to be signed in');
  } 

  if (!authHeader.startsWith('Bearer ')) {
    throw ServiceError.unauthorized('Invalid authentication token');
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
      'The given username and password do not match'
    );
  }

  const passwordValid = await verifyPassword(password, user.password_hash); 

  if (!passwordValid) {
    throw ServiceError.unauthorized(
      'The given email and password do not match'
    );
  }
  return await makeLoginData(user); 
};


const getKlantById = async (id) => {
  const klant = await userRepository.getKlantById(id);
  const exposedKlant = makeExposedUser(klant);
  return exposedKlant; 
}


// Leverancier
const loginLeverancier = async (userName, password) => {
  const user = await userRepository.findLeverancierByUsername(userName);
  if (!user) {
    throw ServiceError.unauthorized(
      'The given username and password do not match'
    );
  }

  const passwordValid = await verifyPassword(password, user.password_hash); 

  if (!passwordValid) {
    throw ServiceError.unauthorized(
      'The given email and password do not match'
    );
  }
  return await makeLoginData(user); 
};

const getLeverancierById = async (id) => {
  const leverancier = await userRepository.getLeverancierById(id);
  const exposedLeverancier = makeExposedUser(leverancier);
  return exposedLeverancier; 
}


module.exports = {
  loginLeverancier,
  loginKlant,
  checkAndParseSession,
  getKlantById,
  getLeverancierById,
};