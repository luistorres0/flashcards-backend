const router = require("express").Router();
const controller = require("./cards.controller")

router.route("/:cardId").get(controller.read).put(controller.update).delete(controller.destroy);
router.route("/").get(controller.list).post(controller.create);

module.exports = router;