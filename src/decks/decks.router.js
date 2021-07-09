const router = require("express").Router();
const controller = require("./decks.controller");

router.route("/").get(controller.list);

module.exports = router;
