/*
  Role Model
  - This file contains the model for adding roles to users
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'A name must be provided!',
    trim: true
  },
  level: {
    type: Number,
    required: 'A role level must be provided!',
    default: 1
  }
});

module.exports = mongoose.model('Role', roleSchema);