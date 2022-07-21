const router = require("express").Router();

const HomeRoutes = require("./home");
const UsersRoutes = require("./users");

router.use("/", HomeRoutes)
router.use("/users", UsersRoutes)

module.exports = router;
