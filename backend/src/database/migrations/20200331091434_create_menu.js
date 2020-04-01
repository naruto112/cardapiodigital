
exports.up = function(knex) {
    return knex.schema.createTable('menu', function (table) {
        table.increments();
        table.string('nome').notNullable();
        table.string('descricao').notNullable();
        table.dateTime('created_datetime').notNullable();
        table.dateTime('update_datetime').notNullable();
        table.integer('usuario_id').notNullable();
        // table.foreign('id').references('usuario_id').inTable('usuario');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('menu');
};
