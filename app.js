const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const helperPassport = require('./helpers/passport')
const cors = require('cors')
const User = require('./models/user.js');
const bcrypt = require('bcrypt');


mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/group-1', ()=>{
	console.log('Mongodb success connect')
})

var users = require('./routes/users')
var posts = require('./routes/posts')

passport.use(new LocalStrategy(
	function(username, password, done){
	  User.findOne({username : username}, (err, user)=>{
	    if(!user){
	      return done(null, { message:'Username or Password is Wrong' })
	    }
	    if(!bcrypt.compareSync(password, user.password)){
	      return done(null, { message: 'Username or Password is Wrong' })
	    }
    return done(null, user)
  })
	}));

const app = express()
app.use(cors())
app.use(passport.initialize());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/api', users)
app.use('/api/posts', posts)


app.listen(3000, ()=>{
	console.log("Connected to port 3000")
})