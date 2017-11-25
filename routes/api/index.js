const router = require("express").Router();
const podcasts = require("./podcasts");
const auth = require("./auth")

// article routes
router.use("/", podcasts);
router.use("/auth", auth);

module.exports = router;