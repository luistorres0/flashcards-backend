exports.up = function (knex) {
  return knex.schema.createTable("cards", (table) => {
    table.increments("id").primary();
    table.text("front").notNullable();
    table.text("back").notNullable();
    table.integer("deckId").unsigned().notNullable();
    table.foreign("deckId").references("id").inTable("decks").onDelete("cascade");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cards");
};
