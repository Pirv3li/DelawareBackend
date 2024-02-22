const { tables } = require('../../src/data');
const { withServer, LeverancierLogin } = require('../supertest.setup');
const Role = require('../../src/core/roles'); 

describe('Users API', () => {
  let request, knex, leverAuth;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  })

  beforeAll(async () => {
    leverAuth = await LeverancierLogin(request);
  });

  describe('POST /api/leverancier/login', () => {
    it('should login and return a token', async () => {
      const response = await request
        .post('/api/leverancier/login')
        .send({
          username: 'Test Leverancier User',
          password: '12345678',
        });

      expect(response.status).toBe(200);
<<<<<<< HEAD
      console.log(response.body);
=======
>>>>>>> fec2e85 (testing)
      expect(response.body).toBeDefined();
    });

    it('should return 401 for invalid login credentials', async () => {
      const response = await request
        .post('/api/leverancier/login')
        .send({
          username: 'Test Leverancier User',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
    });
  });
});