const express = require('express')
const router = express.Router()
const controllerUser = require('../controllers/users')
const controllTwitt = require('../controllers/twitt')
const passport = require('passport')

router.post('/signup', controllerUser.signup)
router.post('/signin', passport.authenticate('local', { session: false }), controllerUser.signin)
router.get('/twitt/:searchpost', controllTwitt.searchPost)
router.post('/twitt/', controllTwitt.twetting)
router.post('/twitt/delete', controllTwitt.destroyTwett)
router.get('/twitt/trend', controllTwitt.trending)
router.get('/twitt/search/:username', controllTwitt.search)


module.exports = router
