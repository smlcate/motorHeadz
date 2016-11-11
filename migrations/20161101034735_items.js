
exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', function(table) {
    table.increments();
    table.string('type');
    table.string('make');
    table.string('model');
    table.text('description');
    table.text('image');
    table.integer('price');
    table.text('inStock');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
