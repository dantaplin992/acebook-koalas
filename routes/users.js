const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/profile", UsersController.Profile)
router.get('/edit', UsersController.Edit)
router.post('/edit', UsersController.Update)
router.post('/delete', UsersController.Delete)

module.exports = router;
