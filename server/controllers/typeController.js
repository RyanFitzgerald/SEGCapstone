/*
  Types Controller
  - This file contains all the backend API logic for project types
*/

const mongoose = require('mongoose');
const Type = mongoose.model('Type');

exports.getTypes = async (req, res) => {
  const types = await Type.find();
  res.send(types);
};

exports.addType = async (req, res) => {
  const type = await (new Type(req.body)).save();
  res.send(type);
};

exports.deleteType = async (req, res) => {
  const type = await Type.findById(req.params.id);
  type.remove();
  res.send({message: 'Deleted Successfully!', deleted: true});
};