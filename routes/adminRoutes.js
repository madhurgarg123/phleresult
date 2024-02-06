const router = require("express").Router();
const Controller = require("../Controllers");
const Auth = require("../common/authentication");

router.post("/login", Controller.Admin.login);
router.put("/Post/:id", Auth.verify, Controller.Admin.editPost);
router.post("/Post", Auth.verify, Controller.Admin.addNewPost);
router.get("/getPost", Auth.verify, Controller.Admin.getPost);
router.delete("/deletePost/:id", Auth.verify, Controller.Admin.deletePost);

module.exports = router;
