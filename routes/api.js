import express from 'express';
import { checkToken } from '../controllers/ApiController.js';
import  userRoutes from './user.js'

const router = express.Router();
router.use('/users', userRoutes)

router.post('/token', checkToken);
router.get('/token', (req, res) => {
    res.send('hello')
});

router.get('/', (req, res) => {
    res.json({
        message: 'api routes'
    })
})

export default router;