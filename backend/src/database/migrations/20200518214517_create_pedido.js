exports.up = function (knex) {
  return knex.schema.createTable("pedido", function (table) {
    table.increments();
    table.string("nomeloja").notNullable();
    table.specificType("pedido_cupom", "longtext").notNullable();
    table.integer("phonecliente").notNullable();
    table.dateTime("created_datetime").notNullable();
    table.dateTime("update_datetime").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("pedido");
};
