const express = require('express');
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const app = express();
const db = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/v1/photos', (req, res) => {
  db('photos').select()
    .then(photos => {
      res.status(200).json(photos);
    })
    .catch(error => {
      res.status(500).json({error, message: 'Failed to fetch photos'});
    });
});

app.listen(app.get('port'), () => {
  console.log(`Server is listening on ${app.get('port')}...`)
})

module.exports = { app, db };
