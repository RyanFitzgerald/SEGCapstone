/*
  Project Controller
  - This file contains all the backend API logic for projects
*/
const mongoose = require('mongoose');
const Project = mongoose.model('Project');

exports.getProjects = async (req, res) => {
  const filter = {};
  let skip = 0;
  let limit = 10;

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

  // Check for page
  if (req.query.page) {
    skip = (req.query.page - 1) * 10;
    if (req.query.page === 'all') {
      limit = 999999;
    }
  }

  const projectsPromise = Project.find(filter).populate('client type', '_id name').sort({ 'created': -1 }).limit(limit).skip(skip);
  const countPromise = Project.find(filter).count();

  const [projects, count] = await Promise.all([projectsPromise, countPromise]);

  res.send({projects, count});
};

exports.getProject = async (req, res) => {
  const project = await Project.findById(req.params.id).populate('client type', '_id name').populate('notes products updates photos files');
  res.send(project);
};

exports.addProject = async (req, res) => {
  const project = await (new Project(req.body)).save();
  res.send(project._id);
};

exports.editProject = async (req, res) => {
  const project = await Project.findOneAndUpdate({ _id: req.params.id }, req.body, {
    runValidators: true
  }).exec();
  res.send(req.params.id);
};

exports.deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  project.remove();
  res.send(true);
}