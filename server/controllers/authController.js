/*
  Auth Controller
  - This file contains all the backend API logic for authentication related tasks
*/

const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
// const promisify = require('es6-promisify');

exports.login = passport.authenticate('local', {
	failureRedirect: '/',
	successRedirect: '/'
});

exports.logout = (req, res) => {
	req.logout();
	res.send('Log out successful');
};

exports.isLoggedIn = (req, res) => {
	res.send(req.isAuthenticated());
};