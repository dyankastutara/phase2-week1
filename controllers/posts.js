var Post = require('../models/post');
var twitt = require('../models/twitt')
var jwt = require('jsonwebtoken')
var axios = require('axios')

module.exports = {
	create:(req,res)=>{
		// let decoded = jwt.verify(req.headers.token,'Secret')
		//insert tweet update status via API here, pokoknya tujuannya supaya dapet id tweet		
		axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.body.latitude},${req.body.longitude}&key=AIzaSyAxtJIbqd0utMpfuxGWCqA1Ui8wVGguEP0`)
		.then(response=>{
			var jalan = response.data.results[0].address_components[6].long_name;
			var kota = response.data.results[2].address_components[0].long_name;
			twitt.getOauth(oauth => {
		    oauth.post(
		      'https://api.twitter.com/1.1/statuses/update.json?status='+req.body.content+'\n\nPosted By '+req.decoded.name+'\nFrom '+jalan+' '+kota,
		      process.env.ACCESS_TOKEN, //test user token
		      process.env.TOKEN_SECRET, //test user secret
		      req.body.content+'\n\nPosted By '+req.decoded.name+'\nFrom '+jalan+' '+kota,
		      'text',
		      function (error, data){
		        if (error){
		        	res.send(error)
		        }else{
		        	var parse = JSON.parse(data)
		        	var tweet_id = parse.id
						  var createPost = new Post({
								content : req.body.content,
								latitude: req.body.latitude,
								longtitude : req.body.longitude,
								jalan : jalan,
								kota : kota,
								tweet_id : tweet_id, // pokoknya ini diambil dari return API status update twitter
								user_id : req.decoded.id
							})
							createPost.save((err, result)=>{
								if (!err){
									res.send(result)
								}else{
									res.send(err)
								}
							})
		        }
		     })
		  })
		})
	},
	read:(req,res)=>{
		console.log(req.decoded)
		if(req.decoded){
		  Post.find({})
		  .sort({createdAt:-1})
		  .populate('user_id')
		  .then(posts=>{
		  	res.send({decoded : req.decoded, posts: posts})
		  })
		  .catch(err=>{
		  	res.send(err)
		  })	
		}else{
		  Post.find({})
		  .sort({createdAt:-1})
		  .populate('user_id')
		  .then(posts=>{
		  	res.send(posts)
		  })
		  .catch(err=>{
		  	res.send(err)
		  })
		}
	},
	deletePost:(req,res)=>{
		// let decoded = jwt.verify(req.headers.token,'Secret')
	  Post.findById(req.params.id,(err,post)=>{
	    if(!err){
				//insert tweet destroy here, parameternya (post.tweet_id)
				if(req.decoded.id==post.user_id) {
				twitt.getOauth(oauth => {
			    oauth.post(
				    `https://api.twitter.com/1.1/statuses/destroy/${Number(post.tweet_id)}.json`,
			      process.env.ACCESS_TOKEN, //test user token
			      process.env.TOKEN_SECRET, //test user secret
			      Number(post.tweet_id),
			      'id',
			      function(e, data){
			        if(e){
			          res.send(e);
			        } else {
				          Post.remove({_id:req.params.id})
						      .then(result=>{
								    res.send(result)
								  })
								  .catch(err=>{
								  	res.send(err)
								  })
								}
				      }
				    )
				  })
				}else {
					res.send('You are not authorized')
				}
	    } else {
	      res.send(`no post with id ${req.params.id}`)
	    }
	  })
	},
	update:(req,res)=>{
	  Post.findById(req.params.id,(err,post)=>{
			if(!err){
				if(req.decoded.id==post.user_id) {
			    post.content=req.body.content
					post.save((err,updatedPost)=>{
	        	res.send(updatedPost)
	      	})
		    } else {
					res.send('You are not authorized')
				}
			} else {
				res.send(`no post with id ${req.params.id}`)
			}
	  })
	}
}
