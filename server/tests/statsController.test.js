// Set some environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = 8888;

// Pull in mongoose and the model
const mongoose = require("mongoose");
const Client = require('../models/Client');
const Project = require('../models/Project');

// Pull in other dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const helpers = require('../../helpers');
const token = helpers.genToken();

chai.use(chaiHttp);
describe('Stats', () => {
  // Empty database
  beforeEach((done) => {
    Client.remove({}, (err) => {   
      Project.remove({}, (err) => { 
        done();         
      });   
    });
  });

  // Get total stats
  describe('/GET total stats', () => {
    it('it should GET all the total stats', (done) => {
      chai.request(server)
        .get(`/api/stats/total?access_token=${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('it should NOT GET all the total stats with token missing', (done) => {
      chai.request(server)
        .get('/api/stats/total')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid Token or Key');
          done();
        });
    });

    it('it should NOT GET all the total stats with invalid token', (done) => {
      chai.request(server)
        .get(`/api/stats/total?access_token=123`)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Oops something went wrong');
          done();
        });
    });
  });

  // Get total stats by type
  describe('/GET total stats by type', () => {
    it('it should GET all the total stats by type', (done) => {
      chai.request(server)
        .get(`/api/stats/types?access_token=${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('it should NOT GET all the total stats by type with token missing', (done) => {
      chai.request(server)
        .get('/api/stats/types')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid Token or Key');
          done();
        });
    });

    it('it should NOT GET all the total stats by type with invalid token', (done) => {
      chai.request(server)
        .get(`/api/stats/types?access_token=123`)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Oops something went wrong');
          done();
        });
    });
  });

  // Get total stats by salesmen
  describe('/GET total stats by salesmen', () => {
    it('it should GET all the total stats by salesmen', (done) => {
      chai.request(server)
        .get(`/api/stats/salesmen?access_token=${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('it should NOT GET all the total stats by salesmen with token missing', (done) => {
      chai.request(server)
        .get('/api/stats/salesmen')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid Token or Key');
          done();
        });
    });

    it('it should NOT GET all the total stats by salesmen with invalid token', (done) => {
      chai.request(server)
        .get(`/api/stats/salesmen?access_token=123`)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Oops something went wrong');
          done();
        });
    });
  });

  // Get total stats by referrals
  describe('/GET total stats by referrals', () => {
    it('it should GET all the total stats by referrals', (done) => {
      chai.request(server)
        .get(`/api/stats/referrals?access_token=${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('it should NOT GET all the total stats by referrals with token missing', (done) => {
      chai.request(server)
        .get('/api/stats/referrals')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid Token or Key');
          done();
        });
    });

    it('it should NOT GET all the total stats by referrals with invalid token', (done) => {
      chai.request(server)
        .get(`/api/stats/referrals?access_token=123`)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Oops something went wrong');
          done();
        });
    });
  });
});