var express = require('express');
var router = express.Router();

var postController = require('../controllers/posts.controller');

/* GET */
router.get('/', postController.getAllPosts);

/* Filtered Posts */
router.get('/', postController.filteredPosts);

router.get('/:post_id', postController.getSinglePost);

module.exports = router;
