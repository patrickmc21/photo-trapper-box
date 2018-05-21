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
    db.migrate.rollback()
      .then(() => {
        db.migrate.latest()
          .then(() => {
            return db.seed.run()
              .then(() => {
                done();
              });
          });
      });
  });

  describe('GET /api/v1/photos', () => {

  });

  describe('POST /api/v1/photos', () => {

  });

  describe('DELETE /api/v1/photos', () => {

  });
});