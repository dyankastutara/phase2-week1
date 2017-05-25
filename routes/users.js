const express = require('express')
const router = express.Router()
const controllerUser = require('../controllers/users')
const passport = require('passport')

router.post('/signup', controllerUser.signup)
router.post('/signin', passport.authenticate('local', { session: false }), controllerUser.signin)

router.get('/getLocation',(req,res)=>{
  res.render('getLocation')
})

router.post('/getLocation',(req,res)=>{
  res.send(req.body)
})


module.exports = router