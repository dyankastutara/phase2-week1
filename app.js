const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const helperPassport = require('./helpers/passport')

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/group-1', ()=>{
	console.log('Mongodb success connect')
})

var users = require('./routes/users')
passport.use(new LocalStrategy(helperPassport));

const app = express()

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(passport.initialize());
app.use('/api', users)

app.listen(3000, ()=>{
	console.log("Connected to port 3000")
})