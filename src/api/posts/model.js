const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: {
    type: String,
    minLength: 4,
    maxLength: 8,
  },
  body: {
    type: String,
    minLength: 5,
    maxLength: 750,
  },
  likes: {
    type: Array,
    unique: false,
  },
  reports: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
