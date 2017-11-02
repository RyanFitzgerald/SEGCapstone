/*
  Helpers
  - This file contains all reusable helper functions
*/

// Import required packages
const fs = require('fs');
const jwt = require('jwt-simple');
require('dotenv').config({ path: 'variables.env' });

// Provides a dump of the data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// Inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);


// Generates a token used for testing
exports.genToken = () => {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, process.env.JWT);
 
  return token;
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}