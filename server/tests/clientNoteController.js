// Set some environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = 8888;

// Pull in mongoose and the model
let mongoose = require("mongoose");
let Client = require('../models/Client');
let ClientNote = require('../models/ClientNote');

// Pull in other dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
describe('Client Notes', () => {
  // Empty database
  beforeEach((done) => {
    ClientNote.remove({}, (err) => { 
      done();         
    });     
  });

  // Add a clientNote to a specific client
  describe('/POST/:id clientNote', () => {
    it('it should NOT POST a clientNote with a missing required field', (done) => {
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
        .post(`/api/clients/${client.id}/notes`)
        .send({
          client: client.id
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.errors.should.have.property('description');
          res.body.error.errors.description.should.have.property('kind').eql('required');
          done();
        });
      });
    });

    it('it should POST a clientNote to a client by the given id', (done) => {
      let client = new Client({
        name: 'Johnny Doe',
        telephone: '613-123-4567',
        email: 'j_doe@test.com',
        street: '123 Main Street',
        postalCode: 'K1A2M5',
        city: 'Ottawa'
      });
      client.save((err, client) => {
        chai.request(server)
        .post(`/api/clients/${client.id}/notes`)
        .send({
          client: client.id,
          description: 'Some note here!'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('description');
          res.body.should.have.property('client').eql(client.id);
          done();
        });
      });
    });
  });

  // Delete a specific clientNote
  describe('/DELETE/:id clientNote', () => {
    it('it should DELETE a clientNote from a client by the given id', (done) => {
      let client = new Client({
        name: 'Marcus Doe',
        telephone: '613-123-4567',
        email: 'marcus_doe@test.com',
        street: '123 Main Street',
        postalCode: 'K1A2M5',
        city: 'Ottawa'
      });
      client.save((err, client) => {
        chai.request(server)
        .post(`/api/clients/${client.id}/notes`)
        .send({
          client: client.id,
          description: 'Some note here!'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('description');
          res.body.should.have.property('client').eql(client.id);

          chai.request(server)
          .delete(`/api/clients/${client.id}/notes/${res.body._id}`)
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
});