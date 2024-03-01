const { withServer, LeverancierLogin } = require("../supertest.setup");
const { testleverAuth } = require("../common/auth");

describe("Adres", () => {
  let request, knex, leverAuth;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  });

  beforeAll(async () => {
    leverAuth = await LeverancierLogin(request);
  });

  const url = "/api/bedrijf";

  describe("GET /api/bedrijf", () => {
    it("should 200 and return all bedrijven", async () => {
      const response = await request.get(url).set("Authorization", leverAuth);
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(3);

      expect(response.body.items[1]).toEqual({
        idBedrijf: 2,
        naam: "Test Comp2",
        logo: "Comp Logo test 2",
        sector: "sector2",
        email: "test2@example.com",
        iban: "BE68539007547034",
        btwNummer: "BE1234567890",
        telefoonnummer: "0471234568",
        gebruikerSinds: "2024-04-01T16:40:24.000Z",
        Adres: {
          idAdres: 2,
          straat: "Test straat2",
          nummer: "2",
          stad: "St Nikloas City",
          postcode: "9100",
          laatstGebruikt: "2024-04-01T16:40:24.000Z",
        },
      });
    });

    it("should 400 when given an invalid argument", async () => {
      const response = await request
        .get(`${url}/badrequest`)
        .set("Authorization", leverAuth);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
    });
  });

  describe("GET /api/bedrijf/:id", () => {
    it("should 200 and return the bedrijf", async () => {
      const response = await request
        .get(`${url}/1`)
        .set("Authorization", leverAuth);
      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        idBedrijf: 1,
        naam: "Test Comp1",
        logo: "Comp Logo test 1",
        sector: "sector1",
        email: "test1@example.com",
        iban: "BE68539007547034",
        btwNummer: "BE1234567890",
        telefoonnummer: "0477777777",
        gebruikerSinds: "2024-04-01T16:40:24.000Z",
        Adres: {
          idAdres: 1,
          straat: "tester straat1",
          nummer: "1",
          stad: "antwerpen",
          postcode: "2000",
          laatstGebruikt: "2024-04-01T16:40:24.000Z",
        },
      });
    });

    it("should 400 when given an invalid argument", async () => {
      const response = await request
        .get(`${url}/badrequest`)
        .set("Authorization", leverAuth);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
    });
  });

  describe("POST /api/bedrijf", () => {
    it("should 201 and return the created bedrijf", async () => {
      const response = await request
        .post(url)
        .set("Authorization", leverAuth)
        .send({
          idAdres: 1,
          naam: "Added Test Comp4",
          logo: "Comp Logo test 4",
          sector: "sector4",
          email: "addedtest4@example.com",
          iban: "BE68539007547034",
          btwNummer: "BE1234567890",
          telefoonnummer: "0477777777",
          gebruikerSinds: "2024-04-01",
        });

      expect(response.status).toBe(201);
      expect(response.body.idBedrijf).toBeTruthy();
      expect(response.body.naam).toBe("Added Test Comp4");
    });
    // testleverAuth(() => request.post(`${url}`));
  });

  describe("PUT /api/bedrijf/:id", () => {
    it("should 200 and return the updated bedrijf", async () => {
      const response = await request
        .put(`${url}/2`)
        .set("Authorization", leverAuth)
        .send({
          idAdres: 2,
          naam: "UPDATED Test Comp2",
          logo: "Comp Logo test 2",
          sector: "sector2",
          email: "addedtest2@example.com",
          iban: "BE68539007547034",
          btwNummer: "BE1234567890",
          telefoonnummer: "0477777777",
          gebruikerSinds: "2024-04-01",
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.idBedrijf).toBe(2);
      expect(response.body.naam).toBe("UPDATED Test Comp2");
    });
    // testleverAuth(() => request.put(`${url}/2`));
  });

  describe("DELETE /api/bedrijf/:id", () => {
    it("should 204 and return nothing", async () => {
      const response = await request
        .delete(`${url}/3`)
        .set("Authorization", leverAuth);
      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });
    // testleverAuth(() => request.delete(`${url}/3`));
  });
});
