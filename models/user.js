const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  surname: String,
  friends: Array,
  friendRequests: Array,
  pendingRequests: Array,
  // profilePic:
  //   {
  //       data: Buffer,
  //       contentType: String
  //   }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
