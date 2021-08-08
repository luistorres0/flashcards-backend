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

module.exports = {
  listAllCards,
  listCardsInDeck,
  read,
};
