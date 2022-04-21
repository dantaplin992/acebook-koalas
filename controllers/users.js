const User = require("../models/user");
const upload = require("../services/imageUpload");
const singleUpload = upload.single("image");

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

  uploadPic (req, res) {
    const uid = req.params.id;
  
    singleUpload(req, res, function (err) {
      if (err) {
        return res.json({
          success: false,
          errors: {
            title: "Image Upload Error",
            detail: err.message,
            error: err,
          },
        });
      }
  
      let update = { profilePicture: req.file.location };
  
      User.findByIdAndUpdate(uid, update, { new: true })
        .then((user) => res.status(200).json({ success: true, user: user }))
        .catch((err) => res.status(400).json({ success: false, error: err }));
    });
  }
  
};

module.exports = UsersController;
