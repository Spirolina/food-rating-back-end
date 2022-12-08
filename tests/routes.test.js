import request from 'supertest';
import app from "../app.js";
import 'dotenv/config'




describe('GET /', () => {
    it('entry point of Rest api', async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
    })
})



describe('GET /api', () => {
    it('entry point of api', async () => {
        const res = await request(app).get("/api");
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual('api routes')
    })
})


describe('GET /api/users', () => {
    it('entry point of api', async () => {
        const res = await request(app).get("/api/users");
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toEqual('user routes')
    })
})