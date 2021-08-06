const knex = require("../db/connection");

function listAllCards() {
  return knex("cards").select("*");
}

function listCardsInDeck(deckId) {
  return knex("cards").select("*").where({ deckId });
}

module.exports = {
  listAllCards,
  listCardsInDeck,
};
