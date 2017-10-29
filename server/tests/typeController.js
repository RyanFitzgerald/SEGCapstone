// Set some environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = 8888;

// Pull in mongoose and the model
let mongoose = require("mongoose");
let Type = require('../models/Type');

// Pull in other dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
describe('Types', () => {
  // Empty database
  beforeEach((done) => {
    Type.remove({}, (err) => { 
      done();         
    });     
  });

  // Get all types
  describe('/GET types', () => {
    it('it should GET all the types', (done) => {
      chai.request(server)
        .get('/api/types')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});