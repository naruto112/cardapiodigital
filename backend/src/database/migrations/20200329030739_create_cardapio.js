
exports.up = function(knex) {
    return knex.schema.createTable('cardapio', function (table) {
        table.increments();
        table.string('nome').notNullable();
        table.string('descricao').notNullable();
        table.dateTime('created_datetime').notNullable();
        table.dateTime('update_datetime').notNullable();
        table.string('usuario_id').notNullable();
        table.foreign('usuario_id').references('user_id').inTable('usuario');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('cardapio');
};
