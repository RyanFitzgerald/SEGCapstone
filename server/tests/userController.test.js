// Set some environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = 8888;

// Pull in mongoose and the model
const mongoose = require("mongoose");
const User = require('../models/User');

// Pull in other dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const helpers = require('../../helpers');
const token = helpers.genToken();

chai.use(chaiHttp);
describe('Users', () => {
  // Empty database
  beforeEach((done) => {
    User.remove({}, (err) => { 
      done();         
    });     
  });

  // Get all users
  describe('/GET users', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
        .get(`/api/users?access_token=${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('it should NOT GET all the users with token missing', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid Token or Key');
          done();
        });
    });

    it('it should NOT GET all the users with invalid token', (done) => {
      chai.request(server)
        .get(`/api/users?access_token=123`)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Oops something went wrong');
          done();
        });
    });
  });

  // Post a user
  describe('/POST user', () => {
    it('it should not POST a user with a required field missing', (done) => {
      const user = {
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: '123',
        access_token: token
      };
      chai.request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.errors.should.have.property('role');
        res.body.error.errors.role.should.have.property('kind').eql('required');
        done();
      });
    });

    it('it should POST a user ', (done) => {
      const user = {
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: '123',
        role: '59f6795706d3a02b341d10fe',
        access_token: token
      };
      chai.request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('string');
        done();
      });
    });
  });

  // Get a specific user
  describe('/GET/:id user', () => {
    it('it should GET a user by the given id', (done) => {
      const user = new User({
        email: 'janedoe@example.com',
        name: 'Jane Doe',
        password: '123',
        role: '59f6795706d3a02b341d10fe',
        access_token: token
      });
      user.save((err, user) => {
        chai.request(server)
        .get(`/api/users/${user.id}?access_token=${token}`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('created');
          res.body.should.have.property('name');
          res.body.should.have.property('email');
          res.body.should.have.property('role');
          res.body.should.not.have.property('password');
          res.body.should.have.property('_id').eql(user.id);
          done();
        });
      });
    });
  });

  // Update a specific user
  describe('/POST/:id user', () => {
    it('it should UPDATE a user by the given id', (done) => {
      const user = new User({
        email: 'markdoe@example.com',
        name: 'Mark Doe',
        password: '123',
        role: '59f6795706d3a02b341d10fe',
        access_token: token
      });
      user.save((err, project) => {
        chai.request(server)
        .post(`/api/users/${user.id}`)
        .send({name: 'Markus Doe', access_token: token})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql('Markus Doe');
          res.body.should.have.property('_id').eql(user.id);
          done();
        });
      });
    });
  });

  // Delete a specific user
  describe('/DELETE/:id user', () => {
    it('it should DELETE a user by the given id', (done) => {
      const user = new User({
        email: 'markdoe@example.com',
        name: 'Mark Doe',
        password: '123',
        role: '59f6795706d3a02b341d10fe',
        access_token: token
      });
      user.save((err, user) => {
        chai.request(server)
        .delete(`/api/users/${user.id}?access_token=${token}`)
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