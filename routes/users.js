const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
const upload = require("../services/imageUpload");
//const singleUpload = upload.single("image");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.post("/:id/add-profile-picture", UsersController.uploadPic);

module.exports = router;
