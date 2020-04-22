
exports.up = function(knex) {
    return knex.schema.createTable('generated_cardapio', function (table) {
        table.increments();
        table.string('domain').notNullable();
        table.integer('menu_id').notNullable();
        table.dateTime('created_datetime').notNullable();
        table.dateTime('update_datetime').notNullable();
        
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('generated_cardapio');
};
