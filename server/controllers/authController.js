/*
  Auth Controller
  - This file contains all the backend API logic for authentication related tasks
*/

const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
// const promisify = require('es6-promisify');

exports.login = (req, res, next) => {
	
	passport.authenticate('local', {
			failureRedirect: '/',
			successRedirect: '/'
		}, (err, user, info) => {
			if (err) { 
				return next(err);
			}

			if (!user) {
				return res.send(false);
			}

			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				}

				return res.send(true);
			});
		}
	)(req, res, next);
};

exports.logout = (req, res) => {
	req.logout();
	res.send({message: 'Log out successful'});
};

exports.isLoggedIn = (req, res) => {
	res.send(req.isAuthenticated());
};

exports.getCurrentUser = (req, res) => {
	if (req.user) {
		res.send(req.user);
	} else {
		res.send(false);
	}
};