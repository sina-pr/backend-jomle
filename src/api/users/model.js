const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  userName: {
    type: String,
    minLength: 4,
    maxLength: 10,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    minLength: 5,
    maxLenght: 35,
  },
  userSignUp: {
    type: Date,
    default: Date.now,
  },
  reports: {
    type: Number,
    default: 0,
  },
});
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
