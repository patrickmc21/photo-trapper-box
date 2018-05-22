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
      return res.status(200).json(photos);
    })
    .catch(error => {
      return res.status(500).json({error, message: 'Failed to fetch photos'});
    });
});

app.post('/api/v1/photos', (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(422).json({message: 'Please supply a valid title and url'})
  }
  db('photos').insert(req.body, ['id', 'title', 'url'])
    .then(photo => {
      return res.status(201).json(photo[0]);
    })
    .catch(error => {
      return res.status(500).json({error, message: 'Failed to post photo'});
    });
});

app.delete('/api/v1/photos/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({message: 'You must include an id to delete'})
  }
  db('photos').where('id', id).del()
    .then(() => {
      return res.sendStatus(204);
    })
    .catch(error => {
      return res.status(404).json({error, message: 'You must include a valid id to delete'});
    });
});

app.listen(app.get('port'), () => {
  console.log(`Server is listening on ${app.get('port')}...`)
})

module.exports = { app, db };
