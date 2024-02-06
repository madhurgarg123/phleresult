const router = require("express").Router();
const AdminRoutes = require("./adminRoutes");
const UsersRoutes = require("./usersRoute");

router.use("/Admin", AdminRoutes);
router.use("/Users", UsersRoutes);

module.exports = router;