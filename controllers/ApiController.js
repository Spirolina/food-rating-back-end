import { validToken } from "../modules/Auth.js";

export const checkToken = (req, res, next) => {
    const token = req.body.token;
    const user = req.body.user;
    try {
        const result = validToken(token, user._id);

        if (!result) {
            return res.status(401).send('invalid')
        }

        res.status(200).send('valid')

    } catch (err) {
        return next(err);
    }
}