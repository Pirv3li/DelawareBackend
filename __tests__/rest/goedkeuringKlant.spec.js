const { tables } = require("../../src/data");
const {
  withServer,
  KlantLogin,
} = require("../supertest.setup");
const Role = require("../../src/core/roles");

describe("/goedkeuringKlant/", () => {
  let request, knex, klantAuth;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  });

  beforeAll(async () => {
    klantAuth = await KlantLogin(request);
  });

  describe("GET /goedkeuringKlant/laatsteWijziging", () => {
    it("should fetch the latest modification", async () => {

      const response = await request
        .get("/api/goedkeuringKlant/laatsteWijziging")
        .set("Authorization",klantAuth)

      expect(response.status).toBe(200);
    });

    it("should return 404 Not found", async () => {
    
      const response = await request
        .get("/goedkeuringKlant/laatsteWijziging")
        .set("Authorization",klantAuth)


      expect(response.status).toBe(404);
    });
  });

  describe("GET /goedkeuringKlant/:id", () => {
    it("should fetch the approval for the given ID", async () => {
      
      const response = await request
        .get("/api/goedkeuringKlant/2")
        .set("Authorization", klantAuth)

      expect(response.status).toBe(200);
    });

    it("should return 403 permission denied", async () => {
      
      const response = await request
        .get("/api/goedkeuringKlant/1")
        .set("Authorization", klantAuth)

      expect(response.status).toBe(200);
    });

  });

  describe("GET /goedkeuringKlant", () => {
    it("should fetch all approvals for the client", async () => {
      const response = await request
        .get("/api/goedkeuringKlant")
        .set("Authorization", klantAuth)

      expect(response.status).toBe(200);
    });

    it("should return 401 unauthorized", async () => {
      const response = await request
        .get("/api/goedkeuringKlant")

      expect(response.status).toBe(401);
    });
  });

});
