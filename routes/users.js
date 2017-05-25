const express = require('express')
const router = express.Router()
const controllerUser = require('../controllers/users')
const passport = require('passport')
const axios = require('axios')

router.get('/signup',(req,res)=>{
  res.render('signup')
})
router.post('/signup', controllerUser.signup)
router.post('/signin', passport.authenticate('local', { session: false }), controllerUser.signin)

router.get('/getLocation',(req,res)=>{
  res.render('getLocation')
})

router.post('/getLocation',(req,res)=>{
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.coordinate}&key=AIzaSyAxtJIbqd0utMpfuxGWCqA1Ui8wVGguEP0`)
  .then(response=>{
    res.send({jalan:response.data.results[1].address_components[0].long_name, kota:response.data.results[2].address_components[0].long_name})
    // res.send(JSON.stringify(response.data, null, 2))
  })
})

// router.get('/viaISP',(req,res)=>{
//     axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=-6.2552968,106.7775739&key=AIzaSyAxtJIbqd0utMpfuxGWCqA1Ui8wVGguEP0')
//     .then(response=>{
//       res.send(response.data);
//       // console.log(response.data);
//     })
//     .catch(error=>{
//       res.send(error);
//     });
//   })


module.exports = router
