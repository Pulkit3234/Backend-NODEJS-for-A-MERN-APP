const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: String,
	message: String,
	name: String,
	creator : String,
	tags: [String], // this will be an array of type string same as tags : [ {type : String}]
	selectedFile: String,
	likeCount: [
		{
			type: String,
		},
	],
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const PostMessage = mongoose.model('PostMessage', postSchema);

module.exports = PostMessage;
