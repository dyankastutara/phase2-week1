var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
	content : {type: String, required:true},
	poster_id:[{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {timestamps:true})

var User = mongoose.model('User', userSchema)
module.exports = User