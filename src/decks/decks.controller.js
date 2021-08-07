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

function validateNameProperty(req, res, next) {
  const { name } = req.body.data;

  if (!name || name.length === 0) {
    return next({
      status: 400,
      message:
        "'name' property is missing or is an empty string. Please include a valid 'name' property in the request body.",
    });
  }

  next();
}

function validateDescriptionProperty(req, res, next) {
  const { description } = req.body.data;

  if (!description || description.length === 0) {
    return next({
      status: 400,
      message:
        "'description' property is missing or is an empty string. Please include a valid 'description' property in the request body.",
    });
  }

  next();
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

async function create(req, res, next) {
  const newDeck = req.body.data;
  const data = await service.create(newDeck);
  res.json({ data });
}

async function update(req, res, next) {
  // Strips the cards out of the existing deck.
  const { cards, ...rest } = res.locals.foundDeck;

  const updatedDeck = {
    ...rest,
    ...req.body.data,
  };

  const data = await service.update(updatedDeck);

  res.json({ data });
}

async function destroy(req, res, next) {
  const { deckId } = req.params;
  await service.destroy(Number(deckId));

  res.sendStatus(204);
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(deckExists), asyncErrorBoundary(read)],
  create: [validateNameProperty, validateDescriptionProperty, asyncErrorBoundary(create)],
  update: [
    asyncErrorBoundary(deckExists),
    validateNameProperty,
    validateDescriptionProperty,
    asyncErrorBoundary(update),
  ],
  destroy: [asyncErrorBoundary(deckExists), asyncErrorBoundary(destroy)],
};
