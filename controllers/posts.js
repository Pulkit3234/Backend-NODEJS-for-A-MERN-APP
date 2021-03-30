const { findByIdAndRemove } = require('../models/postMessage');
const PostMessage = require('../models/postMessage');

exports.getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find();

		res.status(200).json(postMessages);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

exports.createPost = async (req, res) => {
	const post = req.body;
	const newPost = new PostMessage(post);

	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (e) {
		res.status(409).json({ message: error.message });
	}
};

exports.updatePost = async (req, res) => {
	const { id } = req.params;
	const post = req.body;
	console.log(post);

	try {
		const result = await PostMessage.findById(id);
		if (!result) {
			const error = new Error('Post Not found');
			error.statusCode = 404;
			throw error;
		}

		const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true, useFindAndModify: true });

		res.status(200).json(updatedPost);
	} catch (error) {
		if (!error.statusCode) {
			error.statusCode = 502;
		}
		console.log(error);
		res.json({ error });
	}
};

exports.getPost = async (req, res, next) => {
	const { id } = req.params;
	console.log(id);
	try {
		const result = await PostMessage.findById(id);

		res.status(200).json(result);
	} catch (error) {
		console.log(error);
	}
};

exports.deletePost = async (req, res, next) => {
	const id = req.params.id;

	try {
		const result = await PostMessage.findById(id);
		if (!result) {
			console.log(error);
			res.status(404).json(error);
		}

		await PostMessage.findByIdAndRemove(id);
		res.status(200).json({ message: 'Post Deleted' });
	} catch (error) {
		console.log(error);
	}
};

exports.likePost = async (req, res, next) => {
	const id = req.params.id;
	try {
		const result = await PostMessage.findById(id);
		if (!result) {
			console.log('Post not found');
			res.json({ message: 'Post not found' });
		}

		console.log(result)
		const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: result.likeCount + 1 }, { new: true });
		res.status(200).json(updatedPost);
	} catch (error) {
		console.log(error);
		res.status(502).json(error);
	}
};
