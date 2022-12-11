import User from '../models/User.js';
import {genPassword, issueJwt, validEmail} from '../modules/Auth.js'

export const signup = async (req, res, next)  => {
    try {
        const { username, password, email, name, surname } = req.body;
        if (!validEmail(email)) return next(new Error('Invalid Email'));

        const { salt, hash } = genPassword(password);
        const user = new User({
            username,
            email,
            name,
            surname,
            salt,
            hash,
        })

        const result = await user.save();
        const tokenObj = issueJwt(result);

        if (result) {
            res.json({
                success: true,
                message: 'account created',
                tokenObj,

            })
        }

    } catch (err) {
        next(err)
    }
}

export const login = (req, res, next) => {
    // Will be implemented
}

export const logout = (req, res, next) => {
    // Will be implemented
}