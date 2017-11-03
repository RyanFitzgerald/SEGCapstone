// Set some environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = 8888;

// Pull in mongoose and the model
const mongoose = require("mongoose");
const Project = require('../models/Project');

// Pull in other dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const helpers = require('../../helpers');
const token = helpers.genToken();

chai.use(chaiHttp);
describe('Projects', () => {
  // Empty database
  beforeEach((done) => {
    Project.remove({}, (err) => { 
      done();         
    });     
  });

  // Get all clients
  describe('/GET projects', () => {
    it('it should GET all the projects', (done) => {
      chai.request(server)
        .get(`/api/projects?access_token=${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  // Post a project
  describe('/POST project', () => {
    it('it should not POST a project with a required field missing', (done) => {
      const project = {
        fileNumber: '1234567',
        name: 'Walker Roofing Project',
        houseNumber: '123',
        street: 'Main Street',
        postalCode: 'K1A2M1',
        soldDate: '2017-09-19T04:00:00.000Z',
        status: 'Not Started',
        type: ['59bad64bdc33910f9c652a20'],
        client: '59c846e4aa442d126c3e0ba5',
        addedBy: '59f10b411426df3398e31ad7',
        access_token: token
      };
      chai.request(server)
      .post('/api/projects')
      .send(project)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.errors.should.have.property('city');
        res.body.error.errors.city.should.have.property('kind').eql('required');
        done();
      });
    });

    it('it should POST a project ', (done) => {
      const project = {
        fileNumber: '123456',
        name: 'Walker Roofing Project',
        houseNumber: '123',
        street: 'Main Street',
        postalCode: 'K1A2M1',
        city: 'Ottawa',
        soldDate: '2017-09-19T04:00:00.000Z',
        status: 'Not Started',
        type: ['59bad64bdc33910f9c652a20'],
        client: '59c846e4aa442d126c3e0ba5',
        addedBy: '59f10b411426df3398e31ad7',
        access_token: token
      };
      chai.request(server)
      .post('/api/projects')
      .send(project)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('string');
        done();
      });
    });
  });

  // Get a specific project
  describe('/GET/:id project', () => {
    it('it should GET a project by the given id', (done) => {
      const project = new Project({
        fileNumber: '12345',
        name: 'Bobert Roofing Project',
        houseNumber: '123',
        street: 'Main Street',
        postalCode: 'K1A2M1',
        city: 'Ottawa',
        soldDate: '2017-09-19T04:00:00.000Z',
        status: 'Not Started',
        type: ['59bad64bdc33910f9c652a20'],
        client: '59c846e4aa442d126c3e0ba5',
        addedBy: '59f10b411426df3398e31ad7',
        access_token: token
      });
      project.save((err, project) => {
        chai.request(server)
        .get(`/api/projects/${project.id}?access_token=${token}`)
        .send(project)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('fileNumber');
          res.body.should.have.property('name');
          res.body.should.have.property('houseNumber');
          res.body.should.have.property('street');
          res.body.should.have.property('postalCode');
          res.body.should.have.property('city');
          res.body.should.have.property('location');
          res.body.should.have.property('client');
          res.body.should.have.property('status');
          res.body.should.have.property('soldDate');
          res.body.should.have.property('created');
          res.body.should.have.property('type');
          res.body.should.have.property('notes');
          res.body.should.have.property('products');
          res.body.should.have.property('updates');
          res.body.should.have.property('photos');
          res.body.should.have.property('files');
          res.body.should.have.property('addedBy');
          res.body.should.have.property('_id').eql(project.id);
          done();
        });
      });
    });
  });

  // Update a specific project
  describe('/POST/:id project', () => {
    it('it should UPDATE a project by the given id', (done) => {
      const project = new Project({
        fileNumber: '1234',
        name: 'Bobert Roofing Project',
        houseNumber: '123',
        street: 'Main Street',
        postalCode: 'K1A2M1',
        city: 'Ottawa',
        soldDate: '2017-09-19T04:00:00.000Z',
        status: 'Not Started',
        type: ['59bad64bdc33910f9c652a20'],
        client: '59c846e4aa442d126c3e0ba5',
        addedBy: '59f10b411426df3398e31ad7',
        access_token: token
      });
      project.save((err, project) => {
        chai.request(server)
        .post(`/api/projects/${project.id}`)
        .send({startDate: '2017-09-23T04:00:00.000Z', access_token: token})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('startDate').eql('2017-09-23T04:00:00.000Z');
          res.body.should.have.property('_id').eql(project.id);
          done();
        });
      });
    });
  });

  // Delete a specific project
  describe('/DELETE/:id project', () => {
    it('it should DELETE a project by the given id', (done) => {
      const project = new Project({
        fileNumber: '123',
        name: 'Bobert Roofing Project',
        houseNumber: '123',
        street: 'Main Street',
        postalCode: 'K1A2M1',
        city: 'Ottawa',
        soldDate: '2017-09-19T04:00:00.000Z',
        status: 'Not Started',
        type: ['59bad64bdc33910f9c652a20'],
        client: '59c846e4aa442d126c3e0ba5',
        addedBy: '59f10b411426df3398e31ad7',
        access_token: token
      });
      project.save((err, project) => {
        chai.request(server)
        .delete(`/api/projects/${project.id}?access_token=${token}`)
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