const express = require('express');

const router = express.Router();

const postsController = require('../controllers/posts');

const authMiddleware = require('../middleware/auth');

router.get('/', postsController.getPosts);

router.post('/', authMiddleware.auth, postsController.createPost);

router.patch('/:id', authMiddleware.auth, postsController.updatePost);

router.patch('/:id/likePost', authMiddleware.auth, postsController.likePost);

router.delete('/:id', authMiddleware.auth, postsController.deletePost);



module.exports = router;
