const express = require('express')
const knex = require('knex')(require('../knexfile.js')['development'])
const app = express();


app.use(express.json())
// app.use(cookiesParser())

app.get('/missions', (req, res) => {
  console.log('Get request sent.')
  res.send('Received')
})

module.exports = app;