/*
  Project Cost Update Controller
  - This file contains all the backend API logic for project cost updates
*/

const mongoose = require('mongoose');
const CostUpdate = mongoose.model('CostUpdate');
const Project = mongoose.model('Project');

exports.addUpdate = async (req, res) => {
  const update = await (new CostUpdate(req.body)).save();
  res.send(true);
};

exports.deleteUpdate = async (req, res) => {
  const update = await CostUpdate.findById(req.params.update);
  update.remove();
  res.send(true);
};