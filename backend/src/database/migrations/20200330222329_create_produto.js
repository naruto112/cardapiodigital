
exports.up = function(knex) {
    return knex.schema.createTable('produto', function (table) {
        table.increments();
        table.string('nome').notNullable();
        table.string('descricao').notNullable();
        table.string('valor').notNullable();
        table.timestamp('created_datetime').notNullable();
        table.dateTime('update_datetime').notNullable();
        table.integer('menu_id');
        // table.foreign('id').references('menu_id').inTable('menu');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('produto');
};
