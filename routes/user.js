import express from 'express';
import { login } from '../controllers/UserController.js';

const router = express.Router();

router.post('/login', login) 

router.get('/', (req, res) => {
    res.json({
        message: 'user routes'
    })
})

export default router;