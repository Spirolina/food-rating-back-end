import mongoose from "mongoose";
import request from 'supertest';
import app from "../app.js";
import { genPassword, issueJwt, validPassword } from "../modules/Auth.js";
import 'dotenv/config'

const samplePassword = '123456';
const wrongPassword = 'wrong';
let passObj = { salt: null, hash: null };
let tokenObj = {token: null, expiresIn: null}

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_TESTING_URI);
});

describe("GET /", () => {
    it("should write hello world", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
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
        tokenObj = issueJwt(user);
        expect(tokenObj.token).toBeDefined();
        expect(tokenObj.expiresIn).toBeDefined();
    })
})


afterEach(async () => {
    await mongoose.connection.close();
  });