/*
  Helpers
  - This file contains all reusable helper functions
*/

// Import required packages
const fs = require('fs');

// Provides a dump of the data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// Inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);