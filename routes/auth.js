import express from 'express';
import passport from 'passport';


const router = express.Router();


router.get('/', (req, res) => {
    res.json({
        message: 'google auth '
    })
})


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))


router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/log')
    }
)


router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

export default router;