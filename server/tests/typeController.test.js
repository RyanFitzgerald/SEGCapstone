// Set some environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = 8888;

// Pull in mongoose and the model
const mongoose = require("mongoose");
const Type = require('../models/Type');

// Pull in other dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const helpers = require('../../helpers');
const token = helpers.genToken();

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
        .get(`/api/types?access_token=${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('it should NOT GET all the types with token missing', (done) => {
      chai.request(server)
        .get('/api/types')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid Token or Key');
          done();
        });
    });

    it('it should NOT GET all the types with invalid token', (done) => {
      chai.request(server)
        .get(`/api/types?access_token=123`)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Oops something went wrong');
          done();
        });
    });
  });

  // Add a project type
  describe('/POST/:id type', () => {
    it('it should POST a type', (done) => {
      const type = {
        name: 'some project type',
        access_token: token
      };
      chai.request(server)
      .post('/api/types')
      .send(type)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('_id');
        done();
      });
    });
  });

  // Delete a project type
  describe('/DELETE/:id type', () => {
    it('it should DELETE a type', (done) => {
      const type = new Type({
        name: 'cool project type',
        access_token: token
      });
      type.save((err, type) => {
        chai.request(server)
        .delete(`/api/types/${type.id}?access_token=${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Deleted Successfully!');
          res.body.should.have.property('deleted').eql(true);
          done();
        });
      });
    });
  });
});