const { tables } = require("../../src/data");
const { withServer, KlantLogin, LeverancierLogin } = require("../supertest.setup");
const Role = require("../../src/core/roles");

describe("product API", () => {
  let request, knex, klantAuth, leverAuth;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  });

  beforeAll(async () => {
    leverAuth = await LeverancierLogin(request);
  });


  describe("GET /api/producten", () => {
    it("should get producten", async () => {
      const response = await request.get('/api/producten');

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe("POST /api/producten", () => {
    it("should create product", async () => {
      const productData = {
        foto: "https://media.nu.nl/m/un2xpm3ag029_wd854/zwitserse-kaas.jpg",
        naam: "kaas",
        eenheidsprijs:10,
        btwtarief: 2,
        aantal: 1,
        gewicht: 1,
        beschrijving: 'beschrijving', 
      };

      const response = await request
      .post('/api/producten')
      .send(productData)
      .set('Authorization', leverAuth)

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should handle validation errors during creation", async () => {
      const productData = {
        naam: "kaas",
        eenheidsprijs:10,
        btwtarief: 2,
        aantal: 1,
        gewicht: 1,
        beschrijving: 'beschrijving',
      };

      const response = await request
      .post('/api/producten')
      .send(productData)
      .set('Authorization', leverAuth);

      expect(response.status).toBe(400);
    });
  });
});
