const { withServer, KlantLogin } = require("../supertest.setup");
const { testAuthHeader } = require("../common/auth");

describe("Adres", () => {
  let request;
  let authHeader;

  withServer(({ supertest }) => {
    request = supertest;
  });

  beforeAll(async () => {
    authHeader = await KlantLogin(request);
  });

  const url = "/api/adres";

  describe("GET /api/adres", () => {
    it("should 200 and return all adresses", async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(2);

      expect(response.body.items[1]).toEqual({
        idAdres: 2,
        straat: "Test straat2",
        nummer: "2",
        stad: "Test stad2",
        postcode: "1234AC",
        laatstGebruikt: new Date(),
      });
    });

    it("should 400 when given an invalid argument", async () => {
      const response = await request.get(`${url}?invalid=true`);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
    });
  });

  describe("GET /api/adres/:id", () => {
    it("should 200 and return the adres", async () => {
      const response = await request.get(`${url}/1`);
      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        idAdres: 1,
        straat: "Test straat",
        nummer: "1",
        stad: "Test stad",
        postcode: "1234AB",
        laatstGebruikt: new Date(),
      });
    });

    it("should 400 when given an invalid argument", async () => {
      const response = await request.get(`${url}?invalid=true`);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
    });
  });

  describe("POST /api/adres", () => {
    it("should 201 and return the created adres", async () => {
      const response = await request
        .post(url)
        .set("Authorization", authHeader)
        .send({
          straat: "Testerpoststraat",
          nummer: "3",
          stad: "Test stad 3",
          postcode: "1234MB",
          laatstGebruikt: new Date(),
        });

      expect(response.status).toBe(201);
      expect(response.body.idAdres).toBeTruthy();
      expect(response.body.straat).toBe("Testerpoststraat");
    });
    testAuthHeader(() => request.post(`${url}`));
  });

  describe("PUT /api/adres/:id", () => {
    it("should 200 and return the updated adres", async () => {
      const response = await request
        .put(`${url}/2`)
        .set("Authorization", authHeader)
        .send({
          straat: "Testupdatestraat",
          nummer: "1",
          stad: "Test stad",
          postcode: "1234AB",
          laatstGebruikt: new Date(),
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.idAdres).toBe(2);
      expect(response.body.straat).toBe("Testupdatestraat");
    });
    testAuthHeader(() => request.put(`${url}/2`));
  });

  describe("DELETE /api/adres/:id", () => {
    it("should 204 and return nothing", async () => {
      const response = await request
        .delete(`${url}/3`)
        .set("Authorization", authHeader);
      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });
    testAuthHeader(() => request.delete(`${url}/3`));
  });
});
