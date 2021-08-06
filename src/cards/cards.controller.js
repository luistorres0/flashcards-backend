const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./cards.service");

async function list(req, res, next) {
  const { deckId } = req.query;
  let data;
  if (deckId) {
    data = await service.listCardsInDeck(Number(deckId));
  } else {
    data = await service.listAllCards();
  }

  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
