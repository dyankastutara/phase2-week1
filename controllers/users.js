var User = require('../models/user')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
require('dotenv').config()

module.exports = {
	signup : (req, res)=>{
		var signupUser = new User({
			username : req.body.username,
			password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
		})
		signupUser.save((err, result)=>{
			if (!err){
				res.send(result)
			}else{
				res.send(err)
			}
		})
	},
	signin : (req, res)=>{
		var user = req.user
		var token = jwt.sign({
			username : user.username
		}, process.env.JWT_SECRET, {expiresIn : '1h'})

		res.send({
			token : token,
			msg : user.msg
		})
	}
}