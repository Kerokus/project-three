/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('teams').del()
  await knex('teams').insert([
    {id: 1, name: 'Unassigned', current_size: 3, mission_id: 1},
    {id: 2, name: 'Alpha', current_size: 3, mission_id: 3},
    {id: 3, name: 'Bravo', current_size: 3, mission_id: 2},
    {id: 4, name: 'Charlie', current_size: 3, mission_id: 3},
    {id: 5, name: 'Delta', current_size: 3, mission_id: 7},
    {id: 6, name: 'Echo', current_size: 3, mission_id: 8}
  ]);
};
