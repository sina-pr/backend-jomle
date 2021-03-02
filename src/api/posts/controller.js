const postModel = require("./model");
const getAllPosts = async (req, res, next) => {
  const data = await postModel.find({}).sort({ date: -1 });
  res.send(data);
};

const getPostsWithFillter = async (req, res) => {
  let { q } = req.query;
  let searchQuery = "#" + q;
  if (q == "") {
    searchQuery = "";
  }
  let posts = await postModel
    .find({
      body: { $regex: searchQuery, $options: "i" },
    })
    .sort({ date: -1 });

  res.send(posts);
};
const getUserPosts = async (req, res) => {
  const { user } = req.params;
  const posts = await postModel.find({ author: user }).sort({ date: -1 });

  res.send(posts);
};
const sendPostToDB = (req, res) => {
  const { author, body } = req.body;
  const newPost = new postModel({
    author,
    body,
  });
  newPost
    .save()
    .catch((e) => {
      console.log(e);
      const { message } = e;
      res.status(400).send(message);
    })
    .then(() => {
      res.status(200).send("Post saved.");
    });
};
/*
const reportPost = async (req, res) => {
  const { id } = req.params;
  const post = await postModel
    .findById(id)
    .catch((err) => res.status(400).send("Invalid id."));
  const oldReport = post.reports;
  const result = await postModel
    .updateOne({ _id: id }, { reports: oldReport + 1 })
    .catch((err) => res.send(err));

  res.status(200).send("Report submitted.");
};
*/
const likePost = async (req, res) => {
  const { id, user } = req.params;
  const post = await postModel
    .findById(id)
    .catch((err) => res.status(400).send("Invalid id."));

  const result = await postModel
    .updateOne({ _id: id }, { $addToSet: { likes: user } })
    .catch((err) => res.send(err));

  res.status(200).send("Like submitted");
};
const dislikePost = async (req, res) => {
  const { id, user } = req.params;
  const post = await postModel
    .findById(id)
    .catch((err) => res.status(400).send("Invalid id."));

  const result = await postModel
    .updateOne({ _id: id }, { $pull: { likes: user } })
    .catch((err) => res.send(err));

  res.status(200).send("dislike submitted");
};
module.exports = {
  getAllPosts,
  getPostsWithFillter,
  getUserPosts,
  sendPostToDB,
  likePost,
  dislikePost,
};
