const express = require('express')
const knex = require('knex')(require('../knexfile.js')['development'])
const app = express();

app.use(express.json())

//helper functions
const getRequest = async (endpoint, res) => {
  // const string = endpoint.replaceAll('"', '');
  const data = await knex(`${endpoint}`)
    .select('*')
    .then(info => info)
    .catch(err => {
      console.log(err);
      return 'Not an object.'
    })

  if(typeof data === 'object'){
     res.status(200).send(data)
  }else{
    res.status(404).send('There was an error processing your request.')
  }
}

//missions endpoint
app.get('/missions', async (req, res) => {
  const endpoint = 'mission';
  const mission = await getRequest(endpoint, res);
})

//personnel endpoint
app.get('/personnel', async (req, res) => {
  const endpoint = 'personnel';
  const mission = await getRequest(endpoint, res);
})

//teams endpoint
app.get('/teams', async (req, res) => {
  const endpoint = 'teams';
  const mission = await getRequest(endpoint, res);
})
module.exports = app;