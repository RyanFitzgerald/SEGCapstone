// Set some environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = 8888;

// Pull in mongoose and the model
const mongoose = require("mongoose");
const Role = require('../models/Role');

// Pull in other dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const helpers = require('../../helpers');
const token = helpers.genToken();

chai.use(chaiHttp);
describe('Roles', () => {
  // Empty database
  beforeEach((done) => {
    Role.remove({}, (err) => { 
      done();         
    });     
  });

  // Get all roles
  describe('/GET roles', () => {
    it('it should GET all the roles', (done) => {
      chai.request(server)
        .get(`/api/roles?access_token=${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('it should NOT GET all the roles with token missing', (done) => {
      chai.request(server)
        .get('/api/roles')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid Token or Key');
          done();
        });
    });

    it('it should NOT GET all the roles with invalid token', (done) => {
      chai.request(server)
        .get(`/api/roles?access_token=123`)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Oops something went wrong');
          done();
        });
    });
  });
});