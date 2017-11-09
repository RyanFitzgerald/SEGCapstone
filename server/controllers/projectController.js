/*
  Project Controller
  - This file contains all the backend API logic for projects
*/
const mongoose = require('mongoose');
const Project = mongoose.model('Project');

exports.getProjects = async (req, res) => {
  const filter = {};

  //Check for name search
  if (req.query.q) {
    filter.name = { $regex: new RegExp(req.query.q), $options: 'i' };
  }

  // Check for city
  if (req.query.city) {
    filter.city = req.query.city;
  }

  // Check for postal code
  if (req.query.postalCode) {
    filter.postalCode = { $regex: new RegExp(req.query.postalCode), $options: 'i' };
  }

  // Check for street
  if (req.query.street) {
    filter.street = { $regex: new RegExp(req.query.street), $options: 'i' };
  }

  // Check for status
  if (req.query.status) {
    filter.status = req.query.status;
  }

  // Check for type
  if (req.query.type) {
    filter.type = req.query.type;
  }

  const projects = await Project.find(filter).populate('client type', '_id firstName lastName').sort({ 'created': -1 });

  res.send(projects);
};

exports.getProject = async (req, res) => {
  const project = await Project.findById(req.params.id).populate('client type addedBy', '_id name').populate([{
    path: 'notes',
    model: 'ProjectNote',
    populate: {
      path: 'addedBy',
      select: 'name',
      model: 'User'
    }
  }, {
    path: 'products',
    model: 'Product'
  }, {
    path: 'updates',
    model: 'CostUpdate'
  }, {
    path: 'photos',
    model: 'Photo',
    populate: {
      path: 'addedBy',
      select: 'name',
      model: 'User'
    }
  }, {
    path: 'files',
    model: 'File',
    populate: {
      path: 'addedBy',
      select: 'name',
      model: 'User'
    }
  }]);
  res.send(project);
};

exports.addProject = async (req, res) => {
  const project = await (new Project(req.body)).save();
  res.send(project._id);
};

exports.editProject = async (req, res) => {
  const project = await Project.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  }).exec();
  res.send(project);
};

exports.deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  project.remove();
  res.send({message: 'Deleted Successfully!', deleted: true});
}