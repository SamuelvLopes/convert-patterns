/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('session', function (table) {
        table.increments('id');
        table.integer('id_company').notNullable().unsigned();;
        table.string('name').notNullable();
        table.string('webhook').notNullable();
        table.timestamps(false, true);
        table.unique(['name']);

        table.foreign('id_company').references('company.id');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('session');
};
