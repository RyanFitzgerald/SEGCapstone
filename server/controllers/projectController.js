/*
  Project Controller
  - This file contains all the backend API logic for projects
*/
const mongoose = require('mongoose');
const Project = mongoose.model('Project');

exports.getProjects = async (req, res) => {
  const projects = await Project.find().populate('client type', '_id name');
  res.send(projects);
};

exports.getProject = async (req, res) => {
  const project = await Project.findById(req.params.id).populate('client type', '_id name');
  res.send(project);
};

exports.addProject = async (req, res) => {
  const project = await (new Project(req.body)).save();
  res.send(project._id);
};

exports.deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  project.remove();
  res.send(true);
}