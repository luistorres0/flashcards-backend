const knex = require("../db/connection");
const cardsService = require("../cards/cards.service");

function list() {
  return knex("decks")
    .select("*")
    .then((decks) => {
      const formattedDecks = decks.map((deck) => {
        return cardsService.listCardsInDeck(deck.id).then((cards) => {
          deck.cards = cards;
          return deck;
        });
      });

      return Promise.all(formattedDecks);
    });
}

module.exports = {
  list,
};
