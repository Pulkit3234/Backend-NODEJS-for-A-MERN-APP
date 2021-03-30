const express = require('express');

const router = express.Router();

const postsController = require('../controllers/posts');

router.get('/', postsController.getPosts);

router.post('/', postsController.createPost);

router.patch('/:id', postsController.updatePost);

router.patch('/:id/likePost', postsController.likePost);

router.delete('/:id', postsController.deletePost);

module.exports = router;
