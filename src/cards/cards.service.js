const knex = require("../db/connection");

function list() {
  return knex("cards").select("*");
}

module.exports = {
  list,
};
