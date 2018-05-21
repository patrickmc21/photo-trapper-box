const express = require('express');
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const app = express();
const db = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());

app.listen(app.get('port'), () => {
  console.log(`Server is listening on ${app.get('port')}...`)
})

module.exports = { app, db };
