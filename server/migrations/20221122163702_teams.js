/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('teams', table => {
      table.increments();
      table.string('name', 250);
      table.string('team_lead', 250);
      table.integer('current_size');
      table.integer('mission_id');
      table.foreign('mission_id').references('mission.id')
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = function(knex) {
    return knex.schema.alterTable('teams', table => {
        table.dropForeign('team_lead');
        table.dropForeign('mission_id')
    })
    .then (function() {
        return knex.schema.dropTableIfExists('teams');
    })
};
