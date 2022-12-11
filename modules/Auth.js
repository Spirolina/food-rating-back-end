import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import validator from 'email-validator'
const PRIV_KEY = process.env.PRIVATE_KEY;
const PUB_KEY = process.env.PUBLIC_KEY;

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
    const { _id, username } = user;
    const expiresIn = '1m';
    const payload = {
        sub: _id,
        username,
        iat: Date.now(),
    }

    const signedToken = jwt.sign(
        payload,
        { key: PRIV_KEY, passphrase: process.env.PASSPHRASE },
        {
            expiresIn,
            algorithm: 'RS256'
        }
    )

    return {
        token: `Bearer ${signedToken}`,
        expires: expiresIn
    }
}

export const validToken = (token, _id) => {
    token = token.split(' ')[1];
    _id = _id.toString()
    
    return jwt.verify(token, PUB_KEY, { algorithms: ['RS256'], subject: _id }, (err, decode) => {
        if (err) {
            return false;
        }
        return true;
    });
}

export const validEmail =  (email) => {
    return validator.validate(email)
    
}