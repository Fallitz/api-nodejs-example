
exports.up = function(knex) {
    return knex.schema
    .createTable('tokens', function (table) {
        table.text('token').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("tokens");
};
