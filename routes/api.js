import express from 'express';
import userRoutes from './user.js'
import auth from './auth.js'
import index from './index.js'
const router = express.Router();
router.use('/users', userRoutes)

router.use('/index', index)
router.use('/auth', auth)


router.get('/', (req, res) => {
    res.json({
        message: 'api routes'
    })
})

export default router;