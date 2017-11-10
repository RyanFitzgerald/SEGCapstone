// Set some environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = 8888;

// Pull in mongoose and the model
let mongoose = require("mongoose");
let Project = require('../models/Project');
let CostUpdate = require('../models/CostUpdate');

// Pull in other dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
const helpers = require('../../helpers');
const token = helpers.genToken();

chai.use(chaiHttp);
describe('Cost Updates', () => {
  // Empty database
  beforeEach((done) => {
    Project.remove({}, (err) => { 
      CostUpdate.remove({}, (err) => { 
        done();         
      });         
    });    
  });

  // Add a costUpdate to a specific project
  describe('/POST/:id costUpdate', () => {
    it('it should NOT POST a costUpdate with a missing required field', (done) => {
      let project = new Project({
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
        .post(`/api/projects/${project.id}/updates`)
        .send({
          amount: 1000,
          reason: 'Some reason',
          project: project.id,
          addedBy: '59f10b411426df3398e31ad7',
          access_token: token
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.errors.should.have.property('type');
          res.body.error.errors.type.should.have.property('kind').eql('required');
          done();
        });
      });
    });

    it('it should POST a costUpdate to a project by the given id', (done) => {
      let project = new Project({
        fileNumber: '12345',
        name: 'Fitzpatrick Roofing Project',
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
        .post(`/api/projects/${project.id}/updates`)
        .send({
          amount: 1000,
          reason: 'Some reason',
          type: 'Addition',
          project: project.id,
          addedBy: '59f10b411426df3398e31ad7',
          access_token: token
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('amount');
          res.body.should.have.property('reason');
          res.body.should.have.property('type');
          res.body.should.have.property('project').eql(project.id);
          done();
        });
      });
    });
  });

  // Delete a specific costUpdate
  describe('/DELETE/:id costUpdate', () => {
    it('it should DELETE a costUpdate from a project by the given id', (done) => {
      let project = new Project({
        fileNumber: '12345',
        name: 'Mitchell Roofing Project',
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
        .post(`/api/projects/${project.id}/updates`)
        .send({
          project: project.id,
          amount: 1000,
          reason: 'Some reason',
          type: 'Addition',
          addedBy: '59f10b411426df3398e31ad7',
          access_token: token
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('amount');
          res.body.should.have.property('reason');
          res.body.should.have.property('type');
          res.body.should.have.property('project').eql(project.id);

          chai.request(server)
          .delete(`/api/projects/${project.id}/updates/${res.body._id}?access_token=${token}`)
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