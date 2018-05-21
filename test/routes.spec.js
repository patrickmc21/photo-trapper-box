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

});