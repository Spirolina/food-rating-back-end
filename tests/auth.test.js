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

describe("sdafadsfadsfs", () => {
    it('should write admins name', async () => {
        const res = await request(app).get("/admin")
        expect(res.statusCode).toBe(200);
        expect(res.body.admins).toStrictEqual(['kaan','arda']);
    })

    it('should write admins name', async () => {
        const res = await request(app).get("/zort")
        expect(res.statusCode).toBe(404);
    })
})



afterEach(async () => {
    await mongoose.connection.close();
  });