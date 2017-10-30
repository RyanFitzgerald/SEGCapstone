/*
  Role Controller
  - This file contains all the backend API logic for user roles
*/

const mongoose = require('mongoose');
const Role = mongoose.model('Role');

exports.getRoles = async (req, res) => {
  const roles = await Role.find();
  res.send(roles);
};