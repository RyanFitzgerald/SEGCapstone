/*
  User Controller
  - This file contains all the backend API logic for users
*/
const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.getUser = (req, res) => {
  res.send(req.user);
};

exports.addUser = async(req, res) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  const addUser = promisify(User.register, User);
  await addUser(user, req.body.password);
  res.send(user._id);
};

exports.getUsers = async (req, res) => {
  const filter = {};

  //Check for name search
  if (req.query.name) {
    filter.name = { $regex: new RegExp(req.query.name), $options: 'i' };
  }

  // Check for city
  if (req.query.email) {
    filter.email = { $regex: new RegExp(req.query.email), $options: 'i' };;
  }
  console.log(filter);
  const users = await User.find(filter);
  
  res.send(users);
};