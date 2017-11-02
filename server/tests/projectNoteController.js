// Set some environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = 8888;

// Pull in mongoose and the model
const mongoose = require("mongoose");
const Project = require('../models/Project');
const ProjectNote = require('../models/ProjectNote');

// Pull in other dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const helpers = require('../../helpers');
const token = helpers.genToken();

chai.use(chaiHttp);
describe('Project Notes', () => {
  // Empty database
  beforeEach((done) => {
    Project.remove({}, (err) => { 
      ProjectNote.remove({}, (err) => { 
        done();         
      });          
    });     
  });

  // Add a projectNote to a specific project
  describe('/POST/:id projectNote', () => {
    it('it should NOT POST a projectNote with a missing required field', (done) => {
      let project = new Project({
        name: 'Bobert Roofing Project',
        street: '123 Main Street',
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
        .post(`/api/projects/${project.id}/notes`)
        .send({
          project: project.id,
          addedBy: '59f10b411426df3398e31ad7',
          access_token: token
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

    it('it should POST a projectNote to a project by the given id', (done) => {
      let project = new Project({
        name: 'Doe Roofing Project',
        street: '123 Main Street',
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
        .post(`/api/projects/${project.id}/notes`)
        .send({
          project: project.id,
          description: 'Some note here!',
          addedBy: '59f10b411426df3398e31ad7',
          access_token: token
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('description');
          res.body.should.have.property('project').eql(project.id);
          done();
        });
      });
    });
  });

  // Delete a specific projectNote
  describe('/DELETE/:id projectNote', () => {
    it('it should DELETE a projectNote from a project by the given id', (done) => {
      let project = new Project({
        name: 'Mitchell Roofing Project',
        street: '123 Main Street',
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
        .post(`/api/projects/${project.id}/notes`)
        .send({
          project: project.id,
          description: 'Some note here!',
          addedBy: '59f10b411426df3398e31ad7',
          access_token: token
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('description');
          res.body.should.have.property('project').eql(project.id);

          chai.request(server)
          .delete(`/api/projects/${project.id}/notes/${res.body._id}?access_token=${token}`)
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