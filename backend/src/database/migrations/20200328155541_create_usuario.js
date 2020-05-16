exports.up = function (knex) {
  return knex.schema.createTable("usuario", function (table) {
    table.increments();
    table.string("name").notNullable();
    table.string("second_name").notNullable();
    table.string("user").notNullable();
    table.string("password").notNullable();
    table.string("mail").notNullable();
    table.string("city").notNullable();
    table.string("uf").notNullable();
    table.string("cep").notNullable();
    table.string("address").notNullable();
    table.string("number").notNullable();
    table.string("phone").notNullable();
    table.string("token").notNullable();
    table.dateTime("created_datetime").notNullable();
    table.dateTime("update_datetime").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("usuario");
};
