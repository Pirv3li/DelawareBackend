const userRepository = require('../repository/users');
const {verifyPassword} = require('../core/password');
const { generateJWT } = require('../core/jwt'); 
const ServiceError = require('../core/serviceError');

const makeExposedUser = ({ idKlant, klantNummer, idLeverancier, leverancierNummer, gebruikersnaam, isActief }) => ({
  idKlant,
  klantNummer,
  idLeverancier,
  leverancierNummer,
  gebruikersnaam,
  isActief,
  
});

const makeLoginData = async (user) => {
  const token = await generateJWT(user); 
  return {
    user: makeExposedUser(user),
    token,
  }; 
};

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

module.exports = {
  loginLeverancier,
  loginKlant,
};