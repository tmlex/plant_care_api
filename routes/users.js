const express = require('express')
const router = express.Router()
const passport = require('passport')
const controller = require('../controllers/users')

router.get('/', controller.getUsers)

router.get('/active', controller.getActiveUser)

router.post('/login/password', passport.authenticate('local'), controller.getActiveUser)

router.get('/login/google', passport.authenticate('google'))

router.get('/login/google/callback', 
    passport.authenticate('google', {
        successRedirect: `${process.env.APP_BASE_URL}/plants`,
        failureRedirect: `${process.env.APP_BASE_URL}/login` 
    })
)

router.post('/register', controller.register)

router.post('/logout', controller.logout)

module.exports = router