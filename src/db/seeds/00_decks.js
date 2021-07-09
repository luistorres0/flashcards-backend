const data = require("../data/decks-seed-data");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex.raw("TRUNCATE TABLE decks RESTART IDENTITY CASCADE").then(function () {
    // Inserts seed entries
    return knex("decks").insert(data);
  });
};
