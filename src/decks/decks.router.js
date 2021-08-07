const router = require("express").Router();
const controller = require("./decks.controller");

// ====================================== TODO: Implement 'read deck' endpoint ====================================== //

router.route("/").get(controller.list);

module.exports = router;
