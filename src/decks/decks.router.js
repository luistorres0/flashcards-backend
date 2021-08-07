const router = require("express").Router();
const controller = require("./decks.controller");

router.route("/:deckId").get(controller.read);
router.route("/").get(controller.list).post(controller.create);

module.exports = router;
