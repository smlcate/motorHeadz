
exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', function(table) {
    table.increments();
    table.string('title');
    table.string('make');
    table.string('model');
    table.text('image');
    table.integer('price');
    table.integer('inStock');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
