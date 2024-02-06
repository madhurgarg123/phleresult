const router = require("express").Router();
const Controller = require("../Controllers");
const Auth = require("../common/authentication");

router.get("/getPost", Controller.User.getPost);
router.get("/");

module.exports = router;
