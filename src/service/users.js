const userRepository = require('../repository/users');

const makeLoginData = async (user) => {
  const token = await generateJWT(user); 
  return {
    user: makeExposedUser(user),
    token,
  }; 
};

const login = async (email, password) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw ServiceError.unauthorized(
      'The given email and password do not match'
    );
  }

  const passwordValid = await verifyPassword(password, user.Password); 

  if (!passwordValid) {
    throw ServiceError.unauthorized(
      'The given email and password do not match'
    );
  }
  return await makeLoginData(user); 
};

module.exports = {
  login,
};