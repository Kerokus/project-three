/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('mission', table => {
      table.increments();
      table.string('location', 25);
      table.string('description', 500);
      table.date('start_date');
      table.date('end_date')
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('mission');
  };
