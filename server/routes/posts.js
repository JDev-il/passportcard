var express = require('express');
var router = express.Router();
var postController = require('../controllers/posts.controller');
const auth = require("../authentication/tokenVerifier");

/* GET */
router.get('/', auth, postController.getAllPosts);

/* POST */
router.post('/:post_id', auth, postController.deletePost);

module.exports = router;
