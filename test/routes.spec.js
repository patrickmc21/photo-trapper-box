const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const { app, db } = require('../server');

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the html page', (done) => {
    chai.request(app)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.html;
        done();
      });
  });

  it('should deliver 404 for invalid request', (done) => {
    chai.request(app)
      .get('/sad')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
  }); 
});

describe('API routes', () => {

  beforeEach(() => {
    return db.migrate.rollback()
      .then(() => {
        return db.migrate.latest()
      })
      .then(() => {
        return db.seed.run()            
      })
      .catch(error => {
        console.log(error)
        return error
      })
  });

  describe('GET /api/v1/photos', () => {
    it('should return all photos', (done) => {
      chai.request(app)
        .get('/api/v1/photos')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('array');
          response.body.length.should.equal(2);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('title');
          response.body[0].title.should.equal('sunset');
          response.body[0].should.have.property('url');
          response.body[0].url.should.equal('https://upload.wikimedia.org/wikipedia/commons/5/58/Sunset_2007-1.jpg');
          done();
        })
    });
  });

  describe('POST /api/v1/photos', () => {
    it('should post a photo', (done) => {
      chai.request(app)
        .post('/api/v1/photos')
        .send({
          title: 'river',
          url: 'riverurl.com/jpg'
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.should.be.an('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(3);
          response.body.should.have.property('title');
          response.body.title.should.equal('river');
          response.body.should.have.property('url');
          response.body.url.should.equal('riverurl.com/jpg');
          done();
        })
    });

    it('should return error if invalid photo object supplied', (done) => {
      chai.request(app)
        .post('/api/v1/photos')
        .send({title: 'no-url'})
        .end((error, response) => {
          response.should.have.status(400);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.message.should.equal('Please supply a valid title and url');
          done();
        })
    });
  });

  describe('DELETE /api/v1/photos', () => {
    it('should delete a photo', (done) => {
      chai.request(app)
        .delete('/api/v1/photos')
        .send({id: 2})
        .end((error, response) => {
          response.should.have.status(204);
          done();
        });
    });

    it('should return an error if no id supplied', (done) => {
      chai.request(app)
        .delete('/api/v1/photos')
        .send({})
        .end((error, response) => {
          response.should.have.status(400);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.message.should.equal('You must include an id to delete');
          done();
        })
    })

    it('should return error if invalid id supplied', (done) => {
      chai.request(app)
        .delete('/api/v1/photos')
        .send({id: 'photo'})
        .end((error, response) => {
          response.should.have.status(400);
          response.should.be.json;
          response.body.should.be.an('object');
          response.body.should.have.property('message');
          response.body.message.should.equal('You must include a valid id to delete');
          done();
        })
    });
  });
});