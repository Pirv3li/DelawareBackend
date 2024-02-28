const { withServer, KlantLogin } = require("../supertest.setup");
const { testAuthHeader } = require("../common/auth");

describe("bedrijf", () => {
  let request;
  let authHeader;

  withServer(({ supertest }) => {
    request = supertest;
  });

  beforeAll(async () => {
    authHeader = await KlantLogin(request);
  });

  const url = "/api/bedrijf";

  describe("GET /api/bedrijf", () => {
    it("should 200 and return all bedrijven", async () => {
      const response = await request.get(url);
      expect(response.status).toBe(200);
      expect(response.body.count).toBe(3);

      expect(response.body.items[1]).toEqual({
        idBedrijf: 2,
        naam: "Another Company",
        logo: "another-logo.png",
        sector: "Finance",
        iban: "NL20INGB0009876543",
        btwNummer: "NL987654321B01",
        telefoonnummer: "0987654321",
        gebruikerSinds: new Date(),
        idAdres: 2,
      });
    });

    it("should 400 when given an invalid argument", async () => {
      const response = await request.get(`${url}?invalid=true`);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
    });
  });

  describe("GET /api/bedrijf/:id", () => {
    it("should 200 and return the bedrijf", async () => {
      const response = await request.get(`${url}/1`);
      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        idBedrijf: 1,
        naam: "Test Company",
        logo: "test-logo.png",
        sector: "Technology",
        iban: "NL20INGB0001234567",
        btwNummer: "NL123456789B01",
        telefoonnummer: "0123456789",
        gebruikerSinds: new Date(),
        idAdres: 1,
      });
    });

    it("should 400 when given an invalid argument", async () => {
      const response = await request.get(`${url}?invalid=true`);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
    });
  });

  describe("POST /api/bedrijf", () => {
    it("should 201 and return the created bedrijf", async () => {
      const response = await request
        .post(url)
        .set("Authorization", authHeader)
        .send({
          idBedrijf: 4,
          naam: "Fourth Company",
          logo: "fourth-logo.png",
          sector: "Education",
          iban: "NL20INGB0004444444",
          btwNummer: "NL444444444B01",
          telefoonnummer: "0444444444",
          gebruikerSinds: new Date(),
          idAdres: 2,
        });

      expect(response.status).toBe(201);
      expect(response.body.idbedrijf).toBeTruthy();
      expect(response.body.naam).toBe("Fourth Company");
    });
    testAuthHeader(() => request.post(`${url}`));
  });

  describe("PUT /api/bedrijf/:id", () => {
    it("should 200 and return the updated bedrijf", async () => {
      const response = await request
        .put(`${url}/2`)
        .set("Authorization", authHeader)
        .send({
          idBedrijf: 2,
          naam: "Another UPDATED Company",
          logo: "another-logo.png",
          sector: "Finance",
          iban: "NL20INGB0009876543",
          btwNummer: "NL987654321B01",
          telefoonnummer: "0987654321",
          gebruikerSinds: new Date(),
          idAdres: 2,
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.idbedrijf).toBe(2);
      expect(response.body.naam).toBe("Another UPDATED Company");
    });
    testAuthHeader(() => request.put(`${url}/2`));
  });

  describe("DELETE /api/bedrijf/:id", () => {
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
