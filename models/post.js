const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  authorFirstName: String,
  authorSurname: String,
  userId: String,
  likes: Array,
  created_at: { type: Date, default: Date.now },
  comments: Array,
});


const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
