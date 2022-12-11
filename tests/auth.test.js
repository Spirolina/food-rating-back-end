import mongoose from "mongoose";
import request from 'supertest';
import app from "../app.js";
import { genPassword, issueJwt, validEmail, validPassword, validToken } from "../modules/Auth.js";
import 'dotenv/config'
import User from "../models/User.js";
import { connectDb } from "../configs/mongoDbConfig.js";

const samplePassword = '123456';
const wrongPassword = 'wrong';
let passObj = { salt: null, hash: null };
let tokenObj = { token: null, expires: null }
let user;
let db;

const initializeDb = () => {
    return new Promise(async (resolve, reject) => {
        db = await connectDb(process.env.MONGODB_TESTING_URI)
        if (db) {
            const tempUser = new User({
                username: 'example',
                email: 'examplemail@gmail.com'
            });
            tempUser.save((err, result) => {
                if (!err) {
                    user = result;
                    resolve()
                }
            });
        };
    });
};

const clearDb = () => {
    return new Promise((resolve, reject) => {
        User.deleteMany({}, async (err, result) => {
            await db.connection.close();
            resolve();
        });
    })
}

beforeAll( () => {
    return initializeDb();
});

describe("GET /", () => {
    it("should write hello world", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
    })
})



describe('POST /api/users/signup',  () => {
    it('should create user in databse proper username and proper password, return valid token', async () => {
        const res = await request(app)
            .post('/api/users/signup')
            .send({
                username: 'unique',
                password: '123456',
                email: 'g.isik.arda@gmail.com',
                name: 'arda',
                surname: 'isik'

            })
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('account created');
        expect(res.body.tokenObj).toBeDefined();

    })

    // these tests will be implemented
    it('should not create new account if username exists');
    it('should not create improper email');
    it('should exist unique username in db');
    it('should baerer token valid');

})

describe('genPasword() function', () => {
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
        expect(tokenObj.expires).toBeDefined();
    })
})

describe('validToken() function', () => {
    it('should return true if token is valid', () => {
        const result = validToken(tokenObj.token, user._id);
        expect(result).toBe(true);
    })

    it('should return false if token is invalid', () => {
        const result = validToken('wrongtoken', user._id);
        expect(result).toBe(false);
    })

    it('should return false if user id is wrong', () => {
        const result = validToken(tokenObj.token, '25345324534');
        expect(result).toBe(false);
    })
})

describe('validEmail() function', () => {
    it('should return true if email is true', () => {
        const valid = validEmail('g.isik.arda@gmail.com');
        expect(valid).toBe(true);
    })
})

describe('POST /api/token', () => {
    it('return true if token is valid', async () => {
        const res = await request(app)
            .post('/api/token')
            .send({ token: tokenObj.token, user:user,})
        expect(res.statusCode).toBe(200);
        
    })

    it('return false if token is invalid', async () => {
        const res = await request(app)
            .post('/api/token')
            .send({ token: 'wrongtokken', user:user, })
        
        expect(res.statusCode).toBe(401);
        
    })
})


afterAll(() => {
    return clearDb()
});