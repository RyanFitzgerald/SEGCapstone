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

exports.register = async(req, res) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
};