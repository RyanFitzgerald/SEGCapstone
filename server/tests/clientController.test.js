// Set some environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = 8888;

// Pull in mongoose and the model
const mongoose = require("mongoose");
const Client = require('../models/Client');

// Pull in other dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const helpers = require('../../helpers');
const token = helpers.genToken();

chai.use(chaiHttp);
describe('Clients', () => {
  // Empty database
  beforeEach((done) => {
    Client.remove({}, (err) => { 
      done();         
    });     
  });

  // Get all clients
  describe('/GET clients', () => {
    it('it should GET all the clients', (done) => {
      chai.request(server)
        .get(`/api/clients?access_token=${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('it should NOT GET all the clients with token missing', (done) => {
      chai.request(server)
        .get('/api/clients')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid Token or Key');
          done();
        });
    });

    it('it should NOT GET all the clients with invalid token', (done) => {
      chai.request(server)
        .get(`/api/clients?access_token=123`)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Oops something went wrong');
          done();
        });
    });
  });

  // Post a client
  describe('/POST client', () => {
    it('it should not POST a client with a required field missing', (done) => {
      const client = {
        firstName: 'John',
        lastName: 'Doe',
        homePhone: '613-123-4567',
        email: 'jdoe@test.com',
        houseNumber: '123',
        street: 'Main Street',
        postalCode: 'K1A2M5',
        referral: '5a0a2285bb83dd1e2472e33e',
        addedBy: '59f10b411426df3398e31ad7',
        soldBy: '59f10b411426df3398e31ad7',
        access_token: token
      };
      chai.request(server)
      .post('/api/clients')
      .send(client)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.errors.should.have.property('city');
        res.body.error.errors.city.should.have.property('kind').eql('required');
        done();
      });
    });

    it('it should POST a client', (done) => {
      const client = {
        firstName: 'John',
        lastName: 'Doe',
        homePhone: '613-123-4567',
        email: 'jdoe@test.com',
        houseNumber: '123',
        street: 'Main Street',
        city: 'Ottawa',
        postalCode: 'K1A2M5',
        referral: '5a0a2285bb83dd1e2472e33e',
        addedBy: '59f10b411426df3398e31ad7',
        soldBy: '59f10b411426df3398e31ad7',
        access_token: token
      };
      chai.request(server)
      .post('/api/clients')
      .send(client)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('string');
        done();
      });
    });
  });

  // Get a specific client
  describe('/GET/:id client', () => {
    it('it should GET a client by the given id', (done) => {
      let client = new Client({
        firstName: 'John',
        lastName: 'Doe',
        homePhone: '613-123-4567',
        email: 'john_doe@test.com',
        houseNumber: '123',
        street: 'Main Street',
        postalCode: 'K1A2M5',
        city: 'Ottawa',
        referral: '5a0a2285bb83dd1e2472e33e',
        addedBy: '59f10b411426df3398e31ad7',
        soldBy: '59f10b411426df3398e31ad7',
        access_token: token
      });
      client.save((err, client) => {
        chai.request(server)
        .get(`/api/clients/${client.id}?access_token=${token}`)
        .send(client)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('firstName');
          res.body.should.have.property('lastName');
          res.body.should.have.property('homePhone');
          res.body.should.have.property('email');
          res.body.should.have.property('houseNumber');
          res.body.should.have.property('street');
          res.body.should.have.property('postalCode');
          res.body.should.have.property('city');
          res.body.should.have.property('location');
          res.body.should.have.property('created');
          res.body.should.have.property('notes');
          res.body.should.have.property('projects');
          res.body.should.have.property('addedBy');
          res.body.should.have.property('_id').eql(client.id);
          done();
        });
      });
    });
  });

  // Update a specific client
  describe('/POST/:id client', () => {
    it('it should UPDATE a client by the given id', (done) => {
      let client = new Client({
        firstName: 'Tom',
        lastName: 'Doe',
        homePhone: '613-123-4567',
        email: 'tom_doe@test.com',
        houseNumber: '123',
        street: 'Main Street',
        postalCode: 'K1A2M5',
        city: 'Ottawa',
        referral: '5a0a2285bb83dd1e2472e33e',
        addedBy: '59f10b411426df3398e31ad7',
        soldBy: '59f10b411426df3398e31ad7',
        access_token: token
      });
      client.save((err, client) => {
        chai.request(server)
        .post(`/api/clients/${client.id}`)
        .send({firstName: 'Tommy', access_token: token})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('firstName').eql('Tommy');
          res.body.should.have.property('_id').eql(client.id);
          done();
        });
      });
    });
  });

  // Delete a specific client
  describe('/DELETE/:id client', () => {
    it('it should DELETE a client by the given id', (done) => {
      let client = new Client({
        firstName: 'Martha',
        lastName: 'Doe',
        telephone: '613-123-4567',
        email: 'martha_doe@test.com',
        houseNumber: '123',
        street: 'Main Street',
        postalCode: 'K1A2M5',
        city: 'Ottawa',
        referral: '5a0a2285bb83dd1e2472e33e',
        addedBy: '59f10b411426df3398e31ad7',
        soldBy: '59f10b411426df3398e31ad7',
        access_token: token
      });
      client.save((err, client) => {
        chai.request(server)
        .delete(`/api/clients/${client.id}?access_token=${token}`)
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