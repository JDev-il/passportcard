const posts = require("../files/data.json");
let mockPosts = [...posts];

class PostsController {

  static getAllPosts(req, res) {
    if(!mockPosts.length){
      mockPosts = [...posts];
    }
    res.json(mockPosts);
  }

  static deletePost(req, res) {
    if(!mockPosts.length){
      mockPosts = [...posts]
    }
    const { post } = req.body;
    const postToDelete = mockPosts.findIndex((target) => target.id === post.id);
    mockPosts.splice(postToDelete, 1);
    res.json(mockPosts);
  }
}

module.exports = PostsController;
