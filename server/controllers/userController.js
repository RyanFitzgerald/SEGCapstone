/*
  User Controller
  - This file contains all the backend API logic for users
*/
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.getUsers = async (req, res) => {
  const filter = {};

  // Check for name
  if (req.query.name) {
    filter.name = { $regex: new RegExp(req.query.name), $options: 'i' };
  }

  // Check for email
  if (req.query.email) {
    filter.email = { $regex: new RegExp(req.query.email), $options: 'i' };
  }

  // Check for role
  if (req.query.role) {
    filter.role = req.query.role;
  }

  // Get users
  const users = await User.find(filter).populate('role');
  
  // Return users
  res.send(users);
};

exports.getUser = async (req, res) => {
  const user = await User.findById({ _id: req.params.id }).populate('role');
  res.send(user);
};

exports.addUser = async (req, res) => {
  const user = new User({ email: req.body.email, name: req.body.name, role: req.body.role });
  const addUser = promisify(User.register, User);
  await addUser(user, req.body.password);
  res.send(user._id);
};

exports.editUser = async (req, res) => {
  const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    runValidators: true
  }).exec();

  if (req.body.password) {
    const setPassword = promisify(user.setPassword, user);
    await setPassword(req.body.password);
    await user.save();
  }

  res.send(req.params.id);
};

exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.remove();
  res.send({message: 'Deleted Successfully!', deleted: true});
};