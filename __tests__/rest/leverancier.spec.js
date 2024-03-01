const { tables } = require("../../src/data");
const { withServer, LeverancierLogin } = require("../supertest.setup");
const Role = require("../../src/core/roles");

describe("Users API", () => {
  let request, knex, leverAuth;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  });

  beforeAll(async () => {
    leverAuth = await LeverancierLogin(request);
  });

  describe("POST /api/leverancier/login", () => {
    it("should login and return a token", async () => {
      const response = await request.post("/api/leverancier/login").send({
        username: "Test Leverancier User",
        password: "12345678",
      });
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should return 401 for invalid login credentials", async () => {
      const response = await request.post("/api/leverancier/login").send({
        username: "Test Leverancier User",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
    });
  });

  describe("Get /api/leverancier", () => {
    it("should get current leverancier", async () => {
      const response = await request
        .get("/api/leverancier")
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
    });
    it("should give unathorized error", async () => {
      const response = await request.get("/api/leverancier");

      expect(response.body.code).toBe("UNAUTHORIZED");
    });
  });
});
