/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('personnel').del()
  await knex('personnel').insert([
    {id: 1, first_name: 'Joe', last_name: 'Snuffy', rank: 'PFC', mos: '35L', dep_start: '2022-01-01', dep_end: '2022-09-01', contact: 'exampleEmail1@email.com', team_id: 1},
    {id: 2, first_name: 'John', last_name: 'Johnson', rank: 'SPC', mos: '35G', dep_start: '2022-01-01', dep_end: '2022-09-01', contact: 'exampleEmail2@email.com', team_id: 1},
    {id: 3, first_name: 'Bill', last_name: 'Kidd', rank: 'SFC', mos: '35M', dep_start: '2022-01-01', dep_end: '2022-09-01', contact: 'exampleEmail1@email.com', team_id: 1},
    {id: 4, first_name: 'Susan', last_name: 'Susanson', rank: 'SPC', mos: '35T', dep_start: '2022-07-22', dep_end: '2023-07-22', contact: 'exampleEmail1@email.com', team_id: 2},
    {id: 5, first_name: 'Karen', last_name: 'Puckett', rank: 'SPC', mos: '35M', dep_start: '2022-07-22', dep_end: '2023-07-22', contact: 'exampleEmail1@email.com', team_id: 2},
    {id: 6, first_name: 'Oscar', last_name: 'De La Hoya', rank: 'SSG', mos: '35L', dep_start: '2022-07-22', dep_end: '2023-07-22', contact: 'exampleEmail1@email.com', team_id: 2},
    {id: 7, first_name: 'Ricky', last_name: 'Garoldson', rank: 'PV2', mos: '35S', dep_start: '2022-04-08', dep_end: '2023-04-08', contact: 'exampleEmail1@email.com', team_id: 3},
    {id: 8, first_name: 'Tyler', last_name: 'Yancey', rank: 'SGT', mos: '35G', dep_start: '2022-04-08', dep_end: '2023-04-08', contact: 'exampleEmail1@email.com', team_id: 3},
    {id: 9, first_name: 'Justin', last_name: 'Justinson', rank: 'SSG', mos: '35S', dep_start: '2022-04-08', dep_end: '2023-04-08', contact: 'exampleEmail1@email.com', team_id: 3},
    {id: 10, first_name: 'Josh', last_name: 'Joshson', rank: 'PFC', mos: '35F', dep_start: '2022-07-22', dep_end: '2023-07-22', contact: 'exampleEmail1@email.com', team_id: 4},
    {id: 11, first_name: 'Jason', last_name: 'Jasonson', rank: 'PFC', mos: '35F', dep_start: '2022-07-22', dep_end: '2023-07-22', contact: 'exampleEmail1@email.com', team_id: 4},
    {id: 12, first_name: 'Jeff', last_name: 'Jeffson', rank: 'SFC', mos: '35S', dep_start: '2022-07-22', dep_end: '2023-07-22', contact: 'exampleEmail1@email.com', team_id: 4},
    {id: 13, first_name: 'George', last_name: 'Washington', rank: 'SPC', mos: '35M', dep_start: '2022-02-08', dep_end: '2023-02-08', contact: 'exampleEmail1@email.com', team_id: 5},
    {id: 14, first_name: 'Katrina', last_name: 'Valley', rank: 'CPL', mos: '35N', dep_start: '2022-02-08', dep_end: '2023-02-08', contact: 'exampleEmail1@email.com', team_id: 5},
    {id: 15, first_name: 'Hannah', last_name: 'Henderson', rank: 'SGT', mos: '35P', dep_start: '2022-02-08', dep_end: '2023-02-08', contact: 'exampleEmail1@email.com', team_id: 5},
    {id: 16, first_name: 'Robin', last_name: 'Dawson', rank: 'PFC', mos: '35Q', dep_start: '2023-01-08', dep_end: '2024-01-08', contact: 'exampleEmail1@email.com', team_id: 6},
    {id: 17, first_name: 'Sarah', last_name: 'Dunn', rank: 'SPC', mos: '35L', dep_start: '2023-01-08', dep_end: '2024-01-08', contact: 'exampleEmail1@email.com', team_id: 6},
    {id: 18, first_name: 'William', last_name: 'Larkey', rank: 'CPL', mos: '35M', dep_start: '2023-01-08', dep_end: '2024-01-08', contact: 'exampleEmail1@email.com', team_id: 6}
  ]);
};
