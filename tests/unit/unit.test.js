import request from "supertest"
import app from "../../app"
import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET ;
export const MONGO_URI = process.env.MONGO_URI;

beforeAll(async () => {
    mongoose.connect("mongodb://localhost:27017/semester2project")
});

afterAll(async () => {
    mongoose.connection.close()
});

describe("Stations API", () => {
    test("GET stations returns 200", async () => {
        const response = await request(app)
            .get("/api/v1/stations");

        expect(response.statusCode).toBe(200);
    });
});

describe("Login API", () => {
    test("valid login returns a token", async () => {
        const response = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email: "admin@metrosync.com",
                password: "Admin123!"
            });

        expect(response.statusCode).toBe(200);
    });
});

describe("Protected announcements route", () => {
    test("POST without token returns 401", async () => {
        const response = await request(app)
            .post("/api/v1/stations/shohadaa/announcements")
            .send({
                text: "Test announcement"
            });

        expect(response.statusCode).toBe(401);
    });
});