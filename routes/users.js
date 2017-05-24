const express = require('express')
const router = express.Router()
const controllerUser = require('../controllers/users')
const passport = require('passport')

router.post('/signup', controllerUser.signup)
router.post('/signin', passport.authenticate('local', { session: false }), controllerUser.signin)


module.exports = router