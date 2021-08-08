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

function read(deckId) {
  return knex("decks")
    .select("*")
    .where({ id: deckId })
    .first()
    .then((deck) => {
      if (deck) {
        return cardsService.listCardsInDeck(deck.id).then((cards) => {
          deck.cards = cards;
          return deck;
        });
      }

      return null;
    });
}

function create(newDeck) {
  return knex("decks")
    .insert(newDeck, "*")
    .then((decks) => decks[0]);
}

function update(updatedDeck) {
  return knex("decks")
    .update(updatedDeck, "*")
    .where({ id: updatedDeck.id })
    .then((deck) => deck[0]);
}

function destroy(deckId) {
  return knex("decks").del().where({ id: deckId });
}

module.exports = {
  list,
  read,
  create,
  update,
  destroy,
};