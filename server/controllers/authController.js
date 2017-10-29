/*
  Auth Controller
  - This file contains all the backend API logic for authentication related tasks
*/

const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
// const promisify = require('es6-promisify');

exports.login = (req, res, next) => { passport.authenticate('local', 
	{
	 	failureRedirect: '/',
	 	successRedirect: '/'
	}, 
	function(err, user, info) {
		if (err) { console.log('Error!!'); return next(err); }
		if (!user) { console.log('No User!!'); return res.send(false); }
		req.logIn(user, function(err) {
			if (err) {console.log('Success!!'); return next(err); }
			console.log('Success!');
			return res.send(true);
	});
})(req, res, next);
};

exports.logout = (req, res) => {
	req.logout();
	res.send('Log out successful');
};

exports.isLoggedIn = (req, res) => {
	res.send(req.isAuthenticated());
};

exports.getCurrentUser = (req, res) => {
	if(req.user) {
		res.send(req.user);
	} else {
		res.send(false);
	}
};