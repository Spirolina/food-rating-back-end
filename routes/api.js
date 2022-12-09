import express from 'express';
import  userRoutes from './user.js'

const router = express.Router();
router.use('/users', userRoutes)

router.get('/', (req, res) => {
    res.json({
        message: 'api routes'
    })
})

export default router;