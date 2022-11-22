/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('teams').del()
  await knex('teams').insert([
    {id: 1, name: 'Unassigned', team_lead: null, current_size: 3, mission_id: 1},
    {id: 2, name: 'Alpha', team_lead: 6, current_size: 3, mission_id: 3},
    {id: 3, name: 'Bravo', team_lead: 9, current_size: 3, mission_id: 2},
    {id: 4, name: 'Charlie', team_lead: 12, current_size: 3, mission_id: 3},
    {id: 5, name: 'Delta', team_lead: 15, current_size: 3, mission_id: 7},
    {id: 6, name: 'Echo', team_lead: 18, current_size: 3, mission_id: 8}
  ]);
};
