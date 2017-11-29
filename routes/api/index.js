const router = require("express").Router();
const podcasts = require("./podcasts");
const auth = require("./auth");
const episodesRoutes = require ("./episodes");


router.use("/", podcasts);
router.use("/auth", auth);
router.use("/episodes", episodesRoutes);


module.exports = router;