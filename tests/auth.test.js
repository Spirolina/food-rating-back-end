import mongoose from "mongoose";
import request from 'supertest';
import app from "../app.js";
import 'dotenv/config'


beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});

describe("GET /", () => {
    it("should write hello world", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
    })
})



afterEach(async () => {
    await mongoose.connection.close();
  });