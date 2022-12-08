import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const PRIV_KEY = process.env.PRIVATE_KEY;

export const genPassword = (password) => {
    const salt = crypto
        .randomBytes(32)
        .toString('hex');
    
    const hash = crypto
        .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');
    
    return { salt, hash }
}

export const validPassword = (password, hash, salt) => {
    const hashVerify = crypto
        .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');

    return hash === hashVerify;
}

export const issueJwt = (user) => {
    // will be implemented
}
