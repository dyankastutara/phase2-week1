var User = require('../models/user')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
require('dotenv').config()

module.exports = {
	signup : (req, res)=>{
		// User.findOne({username : req.body.username}, (err, result)=>{
		// 	if(err){
		// 		res.send(err)
		// 	}else{
		// 		if(result.username === req.body.username){
		// 			res.send("Username is exists")
		// 		}else{
					var signupUser = new User({
						name : req.body.name,
						username : req.body.username,
						password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
						role : req.body.role || 'member'
					})
					signupUser.save((err, result)=>{
						if (!err){
							res.send(result)
						}else{
							res.send(err)
						}
					})
		// 		}
		// 	}
		// })
	},
	signin : (req, res)=>{
		var user = req.user
	  if(user.hasOwnProperty("message")){
	    res.send(user.message)
	  } else {
			var token = jwt.sign({
				id : user._id,
				name : user.name,
				username : user.username,
				role : user.role
			}, process.env.JWT_SECRET, {expiresIn : '1h'})
			res.send({
				token : token,
				msg : user.msg
			})
		}
	},
	delete : (req, res)=>{
		User.remove({_id : req.params.id})
		.then(result =>{
			res.send(result)
		})
		.catch(err=>{
			res.send(err)
		})
	},
	read : (req, res)=>{
		User.find({})
		.then(result=>{
			res.send(result)
		})
		.catch(err=>{
			res.send(err)
		})
	}
}