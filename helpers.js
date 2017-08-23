/*
  Helpers
  - This file contains all reusable helper functions
*/

// Import required packages
const fs = require('fs');

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// Inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);