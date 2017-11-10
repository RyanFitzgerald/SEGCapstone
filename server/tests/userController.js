// Set some environment variables
process.env.NODE_ENV = 'test'
process.env.PORT = 8888;

// Pull in mongoose and the model
const mongoose = require('mongoose');
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
          res.body.length.should.eql(0);
          done();
        });
    });
  });

  describe('/POST user', () => {
    it('it should not POST a user with name field missing', (done) => {
      const user = {
        email: 'jdoe@test.com',
        password: 'john',
        role: '59f6795706d3a02b341d10fc',
        access_token: token
      };
      chai.request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.errors.should.have.property('name');
        res.body.error.errors.name.should.have.property('kind').eql('required');
        done();
      });
    });
  });

  describe('/POST user', () => {
    it('it should not POST a user with email field missing', (done) => {
      const user = {
        name: 'john',
        password: 'john',
        role: '59f6795706d3a02b341d10fc',
        access_token: token
      };
      chai.request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.have.property('name').eql('MissingUsernameError');
        done();
      });
    });
  });

  describe('/POST user', () => {
    it('it should not POST a user with password field missing', (done) => {
      const user = {
        email: 'jdoe@test.com',
        name: 'john',
        role: '59f6795706d3a02b341d10fc',
        access_token: token
      };
      chai.request(server)
      .post('/api/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.have.property('name').eql('MissingPasswordError');
        done();
      });
    });
  });

  describe('/POST user', () => {
    it('it should POST a user', (done) => {
      const user = {
        email: 'jdoe@test.com',
        name: 'john',
        password: 'john',
        role: '59f6795706d3a02b341d10fc',
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
        let user = new User({
          email: 'jdoe@test.com',
          name: 'John',
          password: 'john',
          role: '59f6795706d3a02b341d10fc',
          access_token: token
        });
        user.save((err, user) => {
          chai.request(server)
          .get(`/api/users/${user.id}?access_token=${token}`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('email');
            res.body.should.have.property('name');
            res.body.should.have.property('role');
            res.body.should.have.property('created');
            res.body.should.have.property('_id').eql(user.id);
            done();
          });
        });
      });
    });

    // Update a specific user
    describe('/POST/:id user', () => {
      it('it should Update a user by the given id', (done) => {
        let user = new User({
          email: 'ldoe@test.com',
          name: 'Leif',
          password: 'leif',
          role: '59f6795706d3a02b341d10fc',
          access_token: token
        });
        user.save((err, user) => {
          chai.request(server)
          .post(`/api/users/${user.id}`)
          .send({name: 'Leaf', access_token: token})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name').eql('Leaf');
            res.body.should.have.property('role');
            res.body.should.have.property('created');
            res.body.should.have.property('_id').eql(user.id);
            done();
          });
        });
      });
    });

      // Delete a specific user
      describe('/DELETE/:id user', () => {
        it('it should Delete a user by the given id', (done) => {
          let user = new User({
            email: 'ddoe@test.com',
            name: 'Dan',
            password: 'dan',
            role: '59f6795706d3a02b341d10fc',
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