const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  getPostsWithFillter,
  getUserPosts,
  sendPostToDB,
  //reportPost,
  likePost,
  dislikePost,
} = require("./controller");

//get
router.get("/", getAllPosts);
router.get("/search/", getPostsWithFillter);
router.get("/:user", getUserPosts);
//

//post
router.post("/", sendPostToDB);
//router.post("/:id/report", reportPost);
router.post("/:id/:user/like", likePost);
router.post("/:id/:user/dislike", dislikePost);
//

module.exports = router;
