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