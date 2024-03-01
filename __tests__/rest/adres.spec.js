const {
  withServer,
  KlantLogin,
  LeverancierLogin,
} = require("../supertest.setup");
const { testAuthHeader } = require("../common/auth");

describe("Adres", () => {
  let request, knex, leverAuth;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  });

  beforeAll(async () => {
    leverAuth = await LeverancierLogin(request);
  });

  const url = "/api/adres";

  describe("GET /api/adres", () => {
    it("should 200 and return all adresses", async () => {
      const response = await request.get(url).set("Authorization", leverAuth);
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(3);

      expect(response.body.items[0]).toEqual({
        idAdres: 1,
        straat: "tester straat1",
        nummer: "1",
        postcode: "2000",
        stad: "antwerpen",
        laatstGebruikt: "2024-04-01T16:40:24.000Z",
      });
    });

    it("should 400 when given an invalid argument", async () => {
      const response = await request.get(`${url}/badrequest`).set("Authorization", leverAuth);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
    });
    //testAuthHeader(() => request.get(`${url}`));
  });

  describe("GET /api/adres/:id", () => {
    it("should 200 and return the adres", async () => {
      const response = await request
        .get(`${url}/1`)
        .set("Authorization", leverAuth);
      console.log("state " + response.status);
      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        idAdres: 1,
        straat: "tester straat1",
        nummer: "1",
        postcode: "2000",
        stad: "antwerpen",
        laatstGebruikt: "2024-04-01T16:40:24.000Z",
      });
    });

    it("should 400 when given an invalid argument", async () => {
      const response = await request.get(`${url}/invalid_id`).set("Authorization", leverAuth);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
    });
    //testAuthHeader(() => request.get(`${url / 1}`));
  });

  describe("POST /api/adres", () => {
    it("should 201 and return the created adres", async () => {
      const response = await request
        .post(url)
        .set("Authorization", leverAuth)
        .send({
          straat: "Testerpoststraat",
          nummer: "3",
          stad: "Test stad 3",
          postcode: "1234MB",
          laatstGebruikt: "2024-04-01T16:40:24.000Z",
        });

      expect(response.status).toBe(201);
      expect(response.body.idAdres).toBeTruthy();
      expect(response.body.straat).toBe("Testerpoststraat");
    });
    //testAuthHeader(() => request.post(`${url}`));
  });

  describe("PUT /api/adres/:id", () => {
    it("should 200 and return the updated adres", async () => {
      const response = await request
        .put(`${url}/2`)
        .set("Authorization", leverAuth)
        .send({
          straat: "Testupdatestraat",
          nummer: "1",
          stad: "Test stad",
          postcode: "1234AB",
          laatstGebruikt: "2024-04-01T16:40:24.000Z",
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.idAdres).toBe(2);
      expect(response.body.straat).toBe("Testupdatestraat");
    });
    //testAuthHeader(() => request.put(`${url}/2`));
  });

  describe("DELETE /api/adres/:id", () => {
    it("should 204 and return nothing", async () => {
      const response = await request
        .delete(`${url}/3`)
        .set("Authorization", leverAuth);
      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });
    //testAuthHeader(() => request.delete(`${url}/3`));
  });
});
