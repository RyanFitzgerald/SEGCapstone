/*
  Stats Controller
  - This file contains all the backend API logic for stats
*/
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const Client = mongoose.model('Client');

exports.getTotal = async (req, res) => {
  const filter = {};

  // TO DO
  // Add filtering

  const total = await Project.find(filter).select('contractCost soldDate').where('contractCost').gt(0);
  res.send(total);
};

exports.getTotalByType = async (req, res) => {
  const filter = {};

  // TO DO
  // Add filtering

  const total = await Project.find(filter).populate('type').select('contractCost soldDate type').where('contractCost').gt(0);
  res.send(total);
};

exports.getTotalBySalesman = async (req, res) => {
  const filter = {};

  // TO DO
  // Add filtering

  const total = await Client.find(filter).populate([{
    path: 'projects',
    model: 'Project',
    select: 'contractCost soldDate',
    match: { contractCost: { $gt: 0 } }
  }, {
    path: 'soldBy',
    model: 'User'
  }])
  .select('soldBy, projects');

  res.send(total);
};

exports.getTotalByReferral = async (req, res) => {
  const filter = {};

  // TO DO
  // Add filtering

  const total = await Client.find().populate([{
    path: 'projects',
    model: 'Project',
    select: 'contractCost soldDate',
    match: { contractCost: { $gt: 0 } }
  }, {
    path: 'referral',
    model: 'Referral'
  }])
  .select('soldBy, projects');

  res.send(total);
};