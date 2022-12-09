import express from 'express';
import { login, logout, signup } from '../controllers/UserController.js';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);


router.get('/', (req, res) => {
    res.json({
        message: 'user routes'
    })
})

export default router;