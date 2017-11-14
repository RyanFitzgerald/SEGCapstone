// Set some environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = 8888;

// Pull in mongoose and the model
const mongoose = require("mongoose");
const Referral = require('../models/Referral');

// Pull in other dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const helpers = require('../../helpers');
const token = helpers.genToken();

chai.use(chaiHttp);
describe('Referrals', () => {
  // Empty database
  beforeEach((done) => {
    Referral.remove({}, (err) => { 
      done();         
    });     
  });

  // Get all referrals
  describe('/GET referrals', () => {
    it('it should GET all the referrals', (done) => {
      chai.request(server)
        .get(`/api/referrals?access_token=${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('it should NOT GET all the referrals with token missing', (done) => {
      chai.request(server)
        .get('/api/referrals')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid Token or Key');
          done();
        });
    });

    it('it should NOT GET all the referrals with invalid token', (done) => {
      chai.request(server)
        .get(`/api/referrals?access_token=123`)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Oops something went wrong');
          done();
        });
    });
  });

  // Add a referral type
  describe('/POST/:id referral', () => {
    it('it should POST a referral', (done) => {
      const referral = {
        name: 'some referral type',
        access_token: token
      };
      chai.request(server)
      .post('/api/referrals')
      .send(referral)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('_id');
        done();
      });
    });
  });

  // Delete a referral type
  describe('/DELETE/:id referral', () => {
    it('it should DELETE a referral', (done) => {
      const referral = new Referral({
        name: 'cool referral type',
        access_token: token
      });
      referral.save((err, referral) => {
        chai.request(server)
        .delete(`/api/referrals/${referral.id}?access_token=${token}`)
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