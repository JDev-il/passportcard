const posts = require("../files/data.json");

class PostsController {

  static getAllPosts(req, res, next) {
    res.json(posts);
  }

  static filteredPosts(req, res, next){

  }

  static getSinglePost(req, res, next) {}
}

module.exports = PostsController;
