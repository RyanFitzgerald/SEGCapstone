/*
  Project Controller
  - This file contains all the backend API logic for projects
*/
const mongoose = require('mongoose');
const Project = mongoose.model('Project');

exports.getProjects = async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
};

exports.addProject = async (req, res) => {
  const project = await (new Project(req.body)).save();
  res.send(project._id);
};