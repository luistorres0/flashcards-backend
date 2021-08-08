const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./cards.service");
const readDeck = require("../decks/decks.service").read;

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

function validateFrontProperty(req, res, next) {
  const { front } = req.body.data;

  if (!front || front.length === 0) {
    return next({
      status: 400,
      message:
        "'front' property is missing or empty: please provide a 'front' property in the request body",
    });
  }

  next();
}

function validateBackProperty(req, res, next) {
  const { back } = req.body.data;

  if (!back || back.length === 0) {
    return next({
      status: 400,
      message:
        "'back' property is missing or empty: please provide a 'back' property in the request body",
    });
  }

  next();
}

async function validateDeckIdProperty(req, res, next) {
  const { deckId } = req.body.data;

  if (!deckId || typeof deckId !== "number") {
    return next({
      status: 400,
      message:
        "'deckId' property is missing or empty: please provide a 'deckId' property in the request body",
    });
  }

  const foundDeck = await readDeck(deckId);
  if (!foundDeck) {
    return next({
      status: 404,
      message: `Could not find deck with id: ${deckId}`,
    });
  }

  next();
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

async function create(req, res, next) {
  const newCard = req.body.data;

  const data = await service.create(newCard);

  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(cardExists), asyncErrorBoundary(read)],
  create: [validateFrontProperty, validateBackProperty, validateDeckIdProperty, create],
};
