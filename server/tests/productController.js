// Set some environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = 8888;

// Pull in mongoose and the model
const mongoose = require("mongoose");
const Project = require('../models/Project');
const Product = require('../models/Product');

// Pull in other dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();
const helpers = require('../../helpers');
const token = helpers.genToken();

chai.use(chaiHttp);
describe('Products', () => {
  // Empty database
  beforeEach((done) => {
    Project.remove({}, (err) => { 
      Product.remove({}, (err) => { 
        done();         
      });         
    });    
  });

  // Add a product to a specific project
  describe('/POST/:id product', () => {
    it('it should NOT POST a product with a missing required field', (done) => {
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
        .post(`/api/projects/${project.id}/products`)
        .send({
          name: 'Some product',
          brand: 'Some brand',
          colour: 'Some colour',
          project: project.id,
          addedBy: '59f10b411426df3398e31ad7',
          access_token: token
        })
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.errors.should.have.property('style');
          res.body.error.errors.style.should.have.property('kind').eql('required');
          done();
        });
      });
    });

    it('it should POST a product to a project by the given id', (done) => {
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
        .post(`/api/projects/${project.id}/products`)
        .send({
          name: 'Some product',
          brand: 'Some brand',
          colour: 'Some colour',
          style: 'Some style',
          project: project.id,
          addedBy: '59f10b411426df3398e31ad7',
          access_token: token
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('brand');
          res.body.should.have.property('colour');
          res.body.should.have.property('style');
          res.body.should.have.property('project').eql(project.id);
          done();
        });
      });
    });
  });

  // Delete a specific product
  describe('/DELETE/:id product', () => {
    it('it should DELETE a product from a project by the given id', (done) => {
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
        .post(`/api/projects/${project.id}/products`)
        .send({
          project: project.id,
          name: 'Some product',
          brand: 'Some brand',
          colour: 'Some colour',
          style: 'Some style',
          addedBy: '59f10b411426df3398e31ad7',
          access_token: token
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('brand');
          res.body.should.have.property('colour');
          res.body.should.have.property('style');
          res.body.should.have.property('project').eql(project.id);

          chai.request(server)
          .delete(`/api/projects/${project.id}/products/${res.body._id}?access_token=${token}`)
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