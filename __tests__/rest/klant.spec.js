const { tables } = require('../../src/data');
const { withServer, KlantLogin } = require('../supertest.setup');
const Role = require('../../src/core/roles'); 

describe('Users API', () => {
  let request, knex, klantAuth, leverAuth;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  })

  beforeAll(async () => {
    klantAuth = await KlantLogin(request);
  });

  describe('POST /api/klant/login', () => {
    it('should login and return a token', async () => {
      const response = await request
        .post('/api/klant/login')
        .send({
          username: 'Test Klant User',
          password: '12345678',
        });

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it('should return 401 for invalid login credentials', async () => {
      const response = await request
        .post('/api/klant/login')
        .send({
          username: 'Test Klant User',
          password: 'wrongpassword',
        });

      expect(response.status).toBe(401);
    });
  });

  describe('Get /api/klant', () => {
    it('should get current klant', async () => {
      const response = await request
      .get('/api/klant')
      .set('Authorization', klantAuth);

      expect(response.status).toBe(200);
    });
  });

});