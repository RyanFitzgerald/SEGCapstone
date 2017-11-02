/*
  Auth Controller
  - This file contains all the backend API logic for authentication related tasks
*/

const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jwt-simple');
require('dotenv').config({ path: 'variables.env' });

function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, process.env.JWT);
 
  return {
    token: token,
    expires: expires
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

exports.login = (req, res, next) => {
	passport.authenticate('local', function(err, user, info) {
		if (err) { 
			return next(err);
		}
		
    // Redirect if it fails
    if (!user) { 
			res.send(false);
			return;
		}

		req.login(user, function(err) {
			if (err) {
				return next(err);
			}
			res.send({user, access: genToken()});
		});
  })(req, res, next);
}

exports.logout = (req, res) => {
	req.logout();
	res.send({message: 'Log out successful'});
};

exports.isLoggedIn = (req, res) => {
	res.send(req.isAuthenticated());
};

