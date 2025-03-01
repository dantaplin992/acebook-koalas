const User = require("../models/user");
const Post = require("../models/post")

const UsersController = {
  New: (req, res) => {
    res.render("users/new", { pageHeader: "Sign Up" });
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
  Profile: (req, res) => {
    User.findOne(
      { _id: req.session.user._id }
    ).then((result) => {
      res.render("users/profile", { pageHeader: "Profile", user: result });
    })
  },
  Edit: (req, res) => {
    User.findOne(
      { _id: req.session.user._id }
    ).then((currentUser) => {
      res.render("users/edit", { user: currentUser})
    })
  },
  Update: (req, res) => {
    console.log(req.body)
    User.updateOne(
      { _id: req.body.id },
      { firstName: req.body.firstName, surname: req.body.surname, email: req.body.email }
    ).then(() => {
      Post.updateMany(
        { userId: req.body.id },
        { authorFirstName: req.body.firstName, authorSurname: req.body.surname}
      ).then(() => {
        res.redirect("/users/profile");
      })
    })
  },
  Delete: (req, res) => {
    User.deleteOne(
      { _id: req.session.user._id }
    ).then(() => {
      res.redirect('/sessions/new')
    })
  }
};



module.exports = UsersController;
