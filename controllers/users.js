const User = require("../models/user");

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
      res.redirect("/users/profile");
    })
  }
};



module.exports = UsersController;
