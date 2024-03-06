const { tables } = require("../../src/data");
const {
  withServer,
  KlantLogin,
  LeverancierLogin,
} = require("../supertest.setup");
const Role = require("../../src/core/roles");

describe("order API", () => {
  let request, knex, klantAuth, leverAuth;

  withServer(({ supertest, knex: k }) => {
    request = supertest;
    knex = k;
  });

  beforeAll(async () => {
    leverAuth = await LeverancierLogin(request);
    klantAuth = await KlantLogin(request);
  });

  describe("GET /api/order", () => {
    it("should retrieve klant orders", async () => {
      const response = await request
        .get("/api/order")
        .set("Authorization", klantAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should retrieve leverancier orders", async () => {
      const response = await request
        .get("/api/order/")
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should retrieve klant order by ID", async () => {
      const orderId = 2;
      const response = await request
        .get(`/api/order/klant/${orderId}`)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should deny invalid order ID for klant", async () => {
      const noAccesOrderId = 1;
      const response = await request
        .get(`/api/order/klant/${noAccesOrderId}`)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(404);
    });

    it("should retrieve leverancier order by ID", async () => {
      const orderId = 2;
      const response = await request
        .get(`/api/order/leverancier/${orderId}`)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should deny invalid order ID for leverancier", async () => {
      const noAccesOrderId = 1;
      const response = await request
        .get(`/api/order/leverancier/${noAccesOrderId}`)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(404);
    });
  });

  describe("POST /api/order", () => {
    it("should create order", async () => {
      const orderData = {
        idKlant: 2,
        idAdres: 2,
        datum: new Date(),
        orderStatus: "pending",
        betalingStatus: "pending",
        totaalPrijs: 100,
      };

      const response = await request
        .post("/api/order")
        .send(orderData)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
    });

    it("should handle validation errors during creation", async () => {
      const orderData = {
        idKlant: 2,
        idAdres: 2,
        datum: new Date(),
        betalingStatus: "pending",
        totaalPrijs: 100,
      };

      const response = await request
        .post("/api/order")
        .send(orderData)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(400);
    });

    it("should handle denied permission", async () => {
      const orderData = {
        idKlant: 1,
        idAdres: 2,
        datum: new Date(),
        orderStatus: "pending",
        betalingStatus: "pending",
        totaalPrijs: 100,
      };

      const response = await request
        .post("/api/order")
        .send(orderData)
        .set("Authorization", klantAuth);

      expect(response.status).toBe(404);
    });

    
    it("should handle denied permission for leverancier", async () => {
      const orderData = {
        idKlant: 2,
        idAdres: 2,
        datum: new Date(),
        orderStatus: "pending",
        betalingStatus: "pending",
        totaalPrijs: 100,
      };

      const response = await request
        .post("/api/order")
        .send(orderData)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(404);
    });
    
  });

  ////////vanaf hier: functionaliteit bespreken met groep.


  describe("PUT /api/order/:id", () => {
    it("should update order", async () => {
      const orderId = 2;
      const updatedOrderData = {
        idKlant: 2,
        idAdres: 2,
        datum: new Date(),
        orderStatus: "updated",
        betalingStatus: "updated",
        totaalPrijs: 200,
      };

      const response = await request
        .put(`/api/order/${orderId}`)
        .send(updatedOrderData)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });

    it("should handle invalid order ID during update", async () => {
      const invalidOrderId = 99999999;
      const updatedOrderData = {
        idKlant: 2,
        idLeverancier: 2,
        idAdres: 2,
        datum: new Date(),
        orderStatus: "updated",
        betalingStatus: "updated",
        totaalPrijs: 200,
      };

      const response = await request
        .put(`/api/order/${invalidOrderId}`)
        .send(updatedOrderData)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /api/order/:id", () => {
    it("should delete order", async () => {
      const orderId = 2;
      const response = await request
        .delete(`/api/order/${orderId}`)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(204);
    });

    it("should handle invalid order ID during deletion", async () => {
      const invalidOrderId = 9999;
      const response = await request
        .delete(`/api/order/${invalidOrderId}`)
        .set("Authorization", leverAuth);

      expect(response.status).toBe(404);
    });
  });
});
