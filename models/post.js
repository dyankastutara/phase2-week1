var mongoose = require('mongoose')
var Schema = mongoose.Schema

var postSchema = new Schema({
	content : {type: String, required:true},
	coordinate: String,
	tweet_id : {type: String, required:true},
	poster_username: {type: String, required:true}
}, {timestamps:true})

var Post = mongoose.model('Post', postSchema)
module.exports = Post