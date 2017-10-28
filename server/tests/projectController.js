// Set some environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = 8888;

// Pull in mongoose and the model
let mongoose = require("mongoose");
let Project = require('../models/Project');

// Pull in other dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
describe('Projects', () => {
  // Empty database
  beforeEach((done) => {
    Project.remove({}, (err) => { 
      done();         
    });     
  });

  // Get all projects
  describe('/GET projects', () => {
    it('it should GET all the projects', (done) => {
      chai.request(server)
        .get('/api/projects')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});