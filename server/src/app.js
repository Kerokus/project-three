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

  if (data.length === 0) {
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
    await knex('personnel').where('id', id).del();
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
    res.status(202).send(`Item with id ${id} successfully deleted.`)
  } catch (e) {
    console.log(e);
    res.status(400).send('There was an error processing your request.');
  }
})

//missions endpoint
app.post('/missions', async (req, res) => {
  try {
    let newMission = {
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
  // const maxIdQuery = await knex('personnel').max('id as maxId').first();
  // let num = maxIdQuery.maxId + 1;
  try {
    let newPersonnel = {
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
    res.status(201).send('Personnel successfully created.')
  } catch(e) {
    console.log(e);
    res.status(400).send(`Post failed`);
  }
})

//teams endpoint
app.post('/teams', async (req, res) => {

})

/* let newPersonnel = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    rank: req.body.rank
    mos: req.body.mos
    dep_start: req.body.dep_start
    dep_end: req.body.dep_end
    contact: req.body.contact
    team_id: req.body.team_id

} */

// knex('personnel').insert([newPersonnel])




module.exports = app;