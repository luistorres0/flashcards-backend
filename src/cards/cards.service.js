const knex = require("../db/connection");

function listAllCards() {
  return knex("cards").select("*");
}

function listCardsInDeck(deckId) {
  return knex("cards").select("*").where({ deckId });
}

function read(cardId) {
  return knex("cards").select("*").where({ id: cardId }).first();
}

function create(newCard) {
  return knex("cards")
    .insert(newCard, "*")
    .then((cards) => cards[0]);
}

function update(updatedCard) {
  return knex("cards")
    .update(updatedCard, "*")
    .where({ id: updatedCard.id })
    .then((cards) => cards[0]);
}

function destroy(cardId) {
  return knex("cards").del().where({ id: cardId });
}

module.exports = {
  listAllCards,
  listCardsInDeck,
  read,
  create,
  update,
  destroy,
};
