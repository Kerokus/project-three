const express = require('express')
const knex = require('knex')(require('../knexfile.js')['development'])
const app = express();

app.use(express.json())

//helper functions
const getRequest = async (endpoint, res, id) => {
  let data = null;
  if(!id){
    try{
      data = await knex(`${endpoint}`)
        .select('*')
    } catch (e) {
      console.log(e);
      res.status(400).send('There was an error processing your request.');
    }
  } else {
    try{
      data = await knex(`${endpoint}`)
        .select('*')
        .where('id', '=', id)
    } catch (e) {
      console.log(e);
      res.status(400).send('There was an error processing your request.');
    }
  }

  if (!data || data.length === 0) {
    res.status(404).send(`${endpoint} not found`);
  } else {
    res.status(200).send(data);
  }
}

//missions endpoint
app.get('/missions', async (req, res) => {
  const mission = await getRequest('mission', res);
})

//personnel endpoint
app.get('/personnel', async (req, res) => {
  const mission = await getRequest('personnel', res);
})

//teams endpoint
app.get('/teams', async (req, res) => {
  const mission = await getRequest('teams', res);
})

//mission/:id endpoint
app.get('/missions/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const mission = await getRequest('mission', res, id);
})

//personnel/:id endpoint
app.get('/personnel/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const mission = await getRequest('personnel', res, id);
})

//teams/:id endpoint
app.get('/teams/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const mission = await getRequest('teams', res, id);
})

//delete mission/:id endpoint
app.delete('/missions/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try{
    await knex('mission').where('id', id).del();
    res.status(202).send(`Item with id ${id} successfully deleted.`)
  } catch (e) {
    console.log(e);
    res.status(400).send('There was an error processing your request.');
  }
})

//delete personnel/:id endpoint
app.delete('/personnel/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try{
    let team_id = await knex('personnel').where('id', id).del(['team_id']);
    team_id = team_id[0].team_id
    const team = await knex('teams').select('*').where('id', team_id);
    const team_size = team[0].current_size;
    await knex('teams')
      .where('id', team_id)
      .update({
        current_size: team_size - 1
      })
    res.status(202).send(`Item with id ${id} successfully deleted.`)
  } catch (e) {
    console.log(e);
    res.status(400).send('There was an error processing your request.');
  }
})

//delete teams/:id endpoint
app.delete('/teams/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try{
    await knex('teams').where('id', id).del();
    const personnel = await knex('personnel').select('*').where('team_id', 1);
    await knex('teams')
    .where('id', 1)
    .update({
      current_size: personnel.length
    })
    res.status(202).send(`Team with id ${id} successfully deleted. All personnel have been moved to the unassigned Team 1`)
  } catch (e) {
    console.log(e);
    res.status(400).send('There was an error processing your request.');
  }
})

//missions endpoint
app.post('/missions', async (req, res) => {
  const maxIdQuery = await knex('mission').max('id as maxId').first();
  let num = maxIdQuery.maxId + 1;
  try {
    let newMission = {
      id: num,
      location: req.body.location,
      description: req.body.description,
      start_date: req.body.start_date,
      end_date: req.body.end_date
    }
    await knex('mission').insert(newMission);
    res.status(201).send('Mission successfully created.')
  } catch(e) {
    console.log(e);
    res.status(400).send(`Post failed`);
  }
})

//personnel endpoint
app.post('/personnel', async (req, res) => {
  const maxIdQuery = await knex('personnel').max('id as maxId').first();
  let num = maxIdQuery.maxId + 1;
  try {
    let newPersonnel = {
      id: num, 
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      rank: req.body.rank,
      mos: req.body.mos,
      dep_start: req.body.dep_start,
      dep_end: req.body.dep_end,
      contact: req.body.contact,
      team_id: req.body.team_id
    }
    await knex('personnel').insert(newPersonnel);
    const team = await knex('teams').select('*').where('id', req.body.team_id);
    const team_size = team[0].current_size;
    await knex('teams')
      .where('id', req.body.team_id)
      .update({
        current_size: team_size + 1
      })
      res.status(201).send(`${newPersonnel.rank} ${newPersonnel.last_name} successfully created and added to team ${newPersonnel.team_id}.`)
  } catch(e) {
    console.log(e);
    res.status(400).send(`Post failed`);
  }
})


//teams endpoint
app.post('/teams', async (req, res) => {
  const maxIdQuery = await knex('teams').max('id as maxId').first();
  let num = maxIdQuery.maxId + 1;
  try {
    let newTeam = {
      id: num,
      name: req.body.name, 
      current_size: req.body.current_size,
      mission_id: req.body.mission_id
    }
    await knex('teams').insert(newTeam);
    res.status(201).send(`Team ${newTeam.name} successfully created and added to mission ${newTeam.mission_id}.`)
  } catch(e) {
    console.log(e);
    res.status(400).send(`Post failed`);
  }
})

//missions patch endpoint
app.put('/missions/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let updatedMission = {
      location: req.body.location,
      description: req.body.description,
      start_date: req.body.start_date,
      end_date: req.body.end_date
    }
    await knex('mission').where('id', id).update(updatedMission);
    res.status(201).send('Mission successfully updated.')
  } catch(e) {
    console.log(e);
    res.status(400).send(`Update failed`);
  }
})

//personnel patch endpoint
app.put('/personnel/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  
  try {
    let originalPersonnel = await knex('personnel').select('*').where('id', id);
    originalPersonnel = originalPersonnel[0];
    let updatedPersonnel = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      rank: req.body.rank,
      mos: req.body.mos,
      dep_start: req.body.dep_start,
      dep_end: req.body.dep_end,
      contact: req.body.contact,
      team_id: req.body.team_id
    }

    if (originalPersonnel.team_id === updatedPersonnel.team_id) {
      await knex('personnel').where('id', id).update(updatedPersonnel);
    } else {
      await knex('personnel').where('id', id).update(updatedPersonnel);
      const oldTeam = await knex('teams').select('*').where('id', originalPersonnel.team_id);
      const oldTeamSize = oldTeam[0].current_size;
      const newTeam = await knex('teams').select('*').where('id', updatedPersonnel.team_id);
      const newTeamSize = newTeam[0].current_size;
      await knex('teams')
      .where('id', newTeam[0].id)
      .update({
        current_size: newTeamSize + 1
      })
      await knex('teams')
      .where('id', oldTeam[0].id)
      .update({
        current_size: oldTeamSize - 1
      })
    }
    res.status(201).send('Personnel successfully updated.')
  } catch(e) {
    console.log(e);
    res.status(400).send(`Update failed`);
  }
})

//teams patch endpoint
app.put('/teams/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let updatedTeam = {
      name: req.body.name, 
      current_size: req.body.current_size,
      mission_id: req.body.mission_id
    }
    await knex('teams').where('id', id).update(updatedTeam);
    res.status(201).send('Team successfully updated.')
  } catch(e) {
    console.log(e);
    res.status(400).send(`Update failed`);
  }
})

module.exports = app;