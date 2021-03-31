const express = require('express');

const router = express.Router();

const postsController = require('../controllers/posts');

const auth = require('/middleware/auth');

router.get('/', postsController.getPosts);

router.post('/', auth, postsController.createPost);

router.patch('/:id', auth,  postsController.updatePost);

router.patch('/:id/likePost', auth,  postsController.likePost);

router.delete('/:id', auth, postsController.deletePost);

module.exports = router;
