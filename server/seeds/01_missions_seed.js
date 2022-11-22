/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE mission CASCADE')
  await knex('mission').del()
  await knex('mission').insert([
    {id: 1, location: 'Base', description: 'Unassigned', start_date: null, end_date: null},
    {id: 2, location: 'Jordan', description: 'Example description 2', start_date: '2022-04-08', end_date: '2022-04-15'},
    {id: 3, location: 'Syria', description: 'Example description 3', start_date: '2022-07-22', end_date: '2022-07-24'},
    {id: 4, location: 'Iraq', description: 'Example description 4', start_date: '2022-06-01', end_date: '2022-07-01'},
    {id: 5, location: 'Kuwait', description: 'Example description 5', start_date: '2022-09-18', end_date: '2022-10-03'},
    {id: 6, location: 'Saudi Arabia', description: 'Example description 6', start_date: '2022-11-28', end_date: '2022-12-10'},
    {id: 7, location: 'Bahrain', description: 'Example description 7', start_date: '2022-02-08', end_date: '2022-02-09'},
    {id: 8, location: 'Qatar', description: 'Example description 8', start_date: '2023-01-08', end_date: '2023-02-15'},
    {id: 9, location: 'Afghanistan', description: 'Example description 9', start_date: '2023-05-06', end_date: '2023-05-07'},
    {id: 10, location: 'Yemen', description: 'Example description 10', start_date: '2023-11-29', end_date: '2023-12-03'},
  ]);
};
