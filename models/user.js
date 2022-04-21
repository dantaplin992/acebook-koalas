const mongoose = require("mongoose");
require('mongoose-type-url');


const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  surname: String,
  profilePic: {
    work: mongoose.SchemaTypes.Url,
    profile: mongoose.SchemaTypes.Url
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
