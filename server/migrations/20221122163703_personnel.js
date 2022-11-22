/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('personnel', table => {
      table.increments();
      table.string('first_name', 250);
      table.string('last_name', 250);
      table.string('rank', 250);
      table.string('mos', 250);
      table.date('dep_start');
      table.date('dep_end');
      table.string('contact', 250);
      table.integer('team_id');
      table.foreign('team_id').references('teams.id')
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
   exports.down = function(knex) {
    return knex.schema.alterTable('personnel', table => {
        table.dropForeign('team_id');
    })
    .then (function() {
        return knex.schema.dropTableIfExists('personnel');
    })
};
