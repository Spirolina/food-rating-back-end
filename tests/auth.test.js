import mongoose from "mongoose";
import request from 'supertest';
import app from "../app.js";
import { genPassword, issueJwt, validPassword } from "../modules/Auth.js";
import 'dotenv/config'

const samplePassword = '123456';
const wrongPassword = 'wrong';
let passObj = { salt: null, hash: null };
let tokenObj = {token: null, expiresIn: null}

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_TESTING_URI);
});

describe("GET /", () => {
    it("should write hello world", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
    })
})

describe('POST /api/users/login',  () => {
    it('should create user in databse proper username and proper password', async () => {
        const res = await request(app)
            .post('/api/users/signup')
            .send({
                username: 'unique',
                password: '123456'
            })
    })
})

describe('getPasword() function', () => {
    it("generate salt hash", () => {
        passObj  = genPassword(samplePassword);
        expect(passObj.salt).toBeDefined();
        expect(passObj.hash).toBeDefined();
    })
})

describe('validPassword() function', () => {
    it('True password should return true', () => {
        const result = validPassword(samplePassword, passObj.hash, passObj.salt);
        expect(result).toEqual(true);
    })

    it('Wrong password should return false', () => {
        const result = validPassword(wrongPassword, passObj.hash, passObj.salt);
        expect(result).toEqual(false);
    })
})

describe('issueJwt() function', () => {
    it('should return an object with bearer token and expire time', () => {
        //will be implemented
    })
})


afterAll(async () => {
    await mongoose.connection.close();
  });