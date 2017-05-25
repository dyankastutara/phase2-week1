var Post = require('../models/post');
var jwt = require('jsonwebtoken')

module.exports = {
	create:(req,res)=>{
		let decoded = jwt.verify(req.headers.token,'Secret')
		//insert tweet update status via API here, pokoknya tujuannya supaya dapet id tweet
		var createPost = new Post({
			content : req.body.content,
			coordinate: req.body.coordinate,
			tweet_id : req.body.tweet_id, // pokoknya ini diambil dari return API status update twitter
			poster_username: decoded.username
		})
		createPost.save((err, result)=>{
			if (!err){
				res.send(result)
			}else{
				res.send(err)
			}
		})
	},
	read:(req,res)=>{
		Post.findAll()
	  .then(posts=>{
	    if(users.length>0){
	      res.send(posts)
	    } else {
	      res.send(`there's currently no post`)
	    }
	  })
	},
	delete:(req,res)=>{
		let decoded = jwt.verify(req.headers.token,'Secret')
	  Post.findById(req.params.id,(err,post)=>{
	    if(!err){
				//insert tweet destroy here, parameternya (post.tweet_id)
				if(decoded.username==post.poster_username) {
		      post.deleteOne({_id:req.params.id},(err,result)=>{
				    res.send(`Successfully deleted post from collection`)
				  })
				} else {
					res.send('You are not authorized')
				}
	    } else {
	      res.send(`no post with id ${req.params.id}`)
	    }
	  })
	},
	update:(req,res)=>{
		let decoded = jwt.verify(req.headers.token,'Secret')
	  Post.findById(req.params.id,(err,post)=>{
			if(!err){
				if(decoded.username==post.poster_username) {
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