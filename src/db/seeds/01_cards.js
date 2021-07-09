const data = require("../data/cards-seed-data");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex.raw("TRUNCATE TABLE cards RESTART IDENTITY CASCADE").then(function () {
    // Inserts seed entries
    return knex("cards").insert(data);
  });
};
