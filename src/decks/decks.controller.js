const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./decks.service");

// ================================================================================================================== //
// =============================================== Validation Handlers ============================================== //
// ================================================================================================================== //

async function deckExists(req, res, next) {
  const { deckId } = req.params;
  const foundDeck = await service.read(Number(deckId));

  if (foundDeck) {
    res.locals.foundDeck = foundDeck;
    return next();
  }

  return next({
    status: 404,
    message: `Could not find deck with id: ${deckId}`,
  });
}

// ================================================================================================================== //
// ================================================== CRUD Handlers ================================================= //
// ================================================================================================================== //

async function list(req, res, next) {
  const data = await service.list();

  return res.json({ data });
}

async function read(req, res, next) {
  const data = res.locals.foundDeck;
  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(deckExists), asyncErrorBoundary(read)],
};
