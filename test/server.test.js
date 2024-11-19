const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server.js");
const { expect } = chai;

chai.use(chaiHttp);

describe("Vehicle API Endpoints", () => {
    // Test GET /vehicle
    describe("GET /vehicle", () => {
        it("should return an empty array when no vehicles are present", async () => {
            const res = await chai.request(app).get("/vehicle");
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array").that.is.empty;
        });
    });

    // Test POST /vehicle
    describe("POST /vehicle", () => {
        it("should create a new vehicle", async () => {
            const vehicle = {
                vin: "1HGCM82633A123456",
                manufacturer_name: "Toyota",
                description: "A reliable sedan.",
                horse_power: 200,
                model_name: "Camry",
                model_year: 2020,
                purchase_price: 25000.0,
                fuel_type: "Gasoline",
            };
            const res = await chai.request(app).post("/vehicle").send(vehicle);
            expect(res).to.have.status(201);
            expect(res.body).to.include(vehicle);
        });

        it("should return 400 Bad Request for malformed JSON", async () => {
          const res = await chai.request(app).post("/vehicle").send('{"vin":"1HGCM82633A123456",');
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error", "Invalid JSON format in request body.");
        });      

        it("should return 422 Unprocessable Entity for missing required fields", async () => {
            const vehicle = {
                vin: "1HGCM82633A123456",
                manufacturer_name: "Toyota",
            }; // Missing other fields
            const res = await chai.request(app).post("/vehicle").send(vehicle);
            expect(res).to.have.status(422);
            expect(res.body).to.have.property("error", "Missing or invalid fields in the request body.");
        });
    });

    // Test GET /vehicle/:vin
    describe("GET /vehicle/:vin", () => {
        it("should retrieve a vehicle by VIN", async () => {
            const res = await chai.request(app).get("/vehicle/1HGCM82633A123456");
            expect(res).to.have.status(200);
            expect(res.body).to.include({ vin: "1HGCM82633A123456" });
        });

        it("should return 404 for a non-existent VIN", async () => {
            const res = await chai.request(app).get("/vehicle/INVALIDVIN");
            expect(res).to.have.status(404);
        });
    });

    // Test PUT /vehicle/:vin
    describe("PUT /vehicle/:vin", () => {
        it("should update an existing vehicle", async () => {
            const updatedVehicle = {
                manufacturer_name: "Toyota",
                description: "Updated description.",
                horse_power: 220,
                model_name: "Camry",
                model_year: 2021,
                purchase_price: 26000.0,
                fuel_type: "Hybrid",
            };
            const res = await chai.request(app).put("/vehicle/1HGCM82633A123456").send(updatedVehicle);
            expect(res).to.have.status(200);
            expect(res.body).to.include(updatedVehicle);
        });

        it("should return 400 Bad Request for malformed JSON", async () => {
          const res = await chai.request(app).put("/vehicle/1HGCM82633A123456").send('{"manufacturer_name":"Toyota",');
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error", "Invalid JSON format in request body.");
        });      

        it("should return 422 Unprocessable Entity for missing required fields", async () => {
            const updatedVehicle = {
                manufacturer_name: "Toyota",
            }; // Missing other fields
            const res = await chai.request(app).put("/vehicle/1HGCM82633A123456").send(updatedVehicle);
            expect(res).to.have.status(422);
            expect(res.body).to.have.property("error", "Missing or invalid fields in the request body.");
        });
    });

    // Test DELETE /vehicle/:vin
    describe("DELETE /vehicle/:vin", () => {
        it("should delete an existing vehicle", async () => {
            const res = await chai.request(app).delete("/vehicle/1HGCM82633A123456");
            expect(res).to.have.status(204);
        });

        it("should return 404 for a non-existent VIN", async () => {
            const res = await chai.request(app).delete("/vehicle/INVALIDVIN");
            expect(res).to.have.status(404);
        });
    });
});
