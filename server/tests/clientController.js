// Set some environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = 8888;

// Pull in mongoose and the model
let mongoose = require("mongoose");
let Client = require('../models/Client');

// Pull in other dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

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
        .get('/api/clients')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  // Post a client
  describe('/POST client', () => {
    it('it should not POST a client with a required field missing', (done) => {
      const client = {
        name: 'John Doe',
        telephone: '613-123-4567',
        email: 'jdoe@test.com',
        street: '123 Main Street',
        postalCode: 'K1A2M5'
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

    it('it should POST a client ', (done) => {
      const client = {
        name: 'John Doe',
        telephone: '613-123-4567',
        email: 'jdoe@test.com',
        street: '123 Main Street',
        postalCode: 'K1A2M5',
        city: 'Ottawa'
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
        name: 'John Doe',
        telephone: '613-123-4567',
        email: 'john_doe@test.com',
        street: '123 Main Street',
        postalCode: 'K1A2M5',
        city: 'Ottawa'
      });
      client.save((err, client) => {
        chai.request(server)
        .get(`/api/clients/${client.id}`)
        .send(client)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('telephone');
          res.body.should.have.property('email');
          res.body.should.have.property('street');
          res.body.should.have.property('postalCode');
          res.body.should.have.property('city');
          res.body.should.have.property('location');
          res.body.should.have.property('created');
          res.body.should.have.property('notes');
          res.body.should.have.property('projects');
          res.body.should.have.property('_id').eql(client.id);
          done();
        });
      });

    });
});
});