const supertest = require('supertest');
const createServer = require('../src/createServer');
const { getKnex } = require('../src/data'); 

const KlantLogin = async (supertest) => {
  const response = await supertest.post('/api/klant/login').send({
    username: 'Test Klant User',
    password: '12345678',
  });

  if (response.statusCode !== 200) {
    throw new Error(response.body.message || 'Unknown error occured');
  }

  return `Bearer ${response.body.token}`; 
};

const LeverancierLogin = async (supertest) => {
  const response = await supertest.post('/api/leverancier/login').send({
    email: 'Test Leverancier User',
    password: '12345678',
  });

  if (response.statusCode !== 200) {
    throw new Error(response.body.message || 'Unknown error occured');
  }

  return `Bearer ${response.body.token}`; 
};

// const AdminLogin = async (supertest) => {
//   const response = await supertest.post('/api/users/login').send({
//     email: 'admin.user@hogent.be',
//     password: '12345678',
//   });

//   if (response.statusCode !== 200) {
//     throw new Error(response.body.message || 'Unknown error occured');
//   }

//   return `Bearer ${response.body.token}`; 
// };

const withServer = (setter) => { 
  let server; 

  beforeAll(async () => {
    server = await createServer(); 

    setter({
      knex: getKnex(),
      supertest: supertest(server.getApp().callback()),
    });
  });

  afterAll(async () => {
    await server.stop(); 
  });
};

module.exports = {
  KlantLogin,
  withServer,
  //adminLogin,
  LeverancierLogin,
}; 