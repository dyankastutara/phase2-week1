const express = require('express')
const router = express.Router()
const controllerUser = require('../controllers/users')
const passport = require('passport')

router.get('/signup',(req,res)=>{
  res.render('signup')
})
router.post('/signup', controllerUser.signup)
router.post('/signin', passport.authenticate('local', { session: false }), controllerUser.signin)

router.get('/getLocation',(req,res)=>{
  res.render('getLocation')
})

router.post('/getLocation',(req,res)=>{
  res.send(req.body)
})

router.get('/viaISP',(req,res)=>{
    axios.get('http://ip-api.com/json')
    .then(response=>{
      res.send(response.data);
      // console.log(response.data);
    })
    .catch(error=>{
      res.send(error);
    });
  })


module.exports = router