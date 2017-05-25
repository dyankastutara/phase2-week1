const express = require('express')
const router = express.Router()
const controllerUser = require('../controllers/users')
const controllerPost = require('../controllers/posts')
const passport = require('passport')
const axios = require('axios');

router.post('/signup', controllerUser.signup)
router.post('/signin', passport.authenticate('local', { session: false }), controllerUser.signin)

router.get('/post',controllerPost.create)
router.post('/post',controllerPost.create)
router.delete('/post/:id',controllerPost.create)
router.put('/post/:id',controllerPost.create)


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

// router.post('/getLocation',(req,res)=>{
//   axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.coordinate}&key=AIzaSyBiVlsb6C6scrThz2ZrZlB-UZlx2MVknhs`)
//   .then(response=>{
//     res.send(response.data);
//     // console.log(response.data);
//   })
//   .catch(error=>{
//     res.send(error);
//   });
// })

module.exports = router