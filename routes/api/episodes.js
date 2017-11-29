const router = require("express").Router();
const episodesController = require("../../controllers/episodesController");

router.route("/search/:id").get(episodesController.findAll);

module.exports = router;