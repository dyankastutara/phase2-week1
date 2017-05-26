const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const helperPassport = require('./helpers/passport')
const cors = require('cors')


mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/group-1', ()=>{
	console.log('Mongodb success connect')
})

var users = require('./routes/users')
var posts = require('./routes/posts')

passport.use(new LocalStrategy(helperPassport));

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(passport.initialize());
app.use('/api', users)
app.use('/api/posts', posts)


app.listen(3000, ()=>{
	console.log("Connected to port 3000")
})