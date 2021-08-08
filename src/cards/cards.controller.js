const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./cards.service");

// ================================================================================================================== //
// =============================================== Validation Handlers ============================================== //
// ================================================================================================================== //
async function cardExists(req, res, next) {
  const { cardId } = req.params;
  const foundCard = await service.read(Number(cardId));

  if (foundCard) {
    res.locals.foundCard = foundCard;
    return next();
  }

  next({
    status: 404,
    message: `Could not find card with id: ${cardId}`,
  });
}

// ================================================================================================================== //
// ================================================== CRUD Handlers ================================================= //
// ================================================================================================================== //

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

async function read(req, res, next) {
  const data = res.locals.foundCard;

  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(cardExists), asyncErrorBoundary(read)],
};
