// Set some environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = 8888;

// Pull in mongoose and the model
let mongoose = require("mongoose");
let Role = require('../models/Role');

// Pull in other dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
describe('Roles', () => {
  // Empty database
  beforeEach((done) => {
    Type.remove({}, (err) => { 
      done();         
    });     
  });

  // Get all roles
  describe('/GET roles', () => {
    it('it should GET all the roles', (done) => {
      chai.request(server)
        .get('/api/roles')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});