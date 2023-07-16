/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('session', function (table) {
        table.increments('id');
        table.integer('id_company').notNullable().unsigned();;
        table.string('name').notNullable();
        table.timestamps(false, true);
        table.unique(['id_company', 'name']);

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
