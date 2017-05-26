var mongoose = require('mongoose')
var Schema = mongoose.Schema

var postSchema = new Schema({
	content : {type: String, required:true},
	coordinate: String,
	tweet_id : {type: String, required:true},
	user_id: {type: Schema.Types.ObjectId, ref: 'User' }
}, {timestamps:true})

var Post = mongoose.model('Post', postSchema)
module.exports = Post