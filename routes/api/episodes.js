const router = require("express").Router();
const episodesController = require("../../controllers/episodesController");

router.route("/search/:id").get(episodesController.findAll);
router.route("/search-one/:pod_id/:ep_url").get(episodesController.findOne);

module.exports = router;