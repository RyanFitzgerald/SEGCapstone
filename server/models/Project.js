/*
  Project Model
  - This file contains the model for projects
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const projectSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  firstName: {
    type: String,
    required: 'A first name must be provided!',
    trim: true
  }
});

module.exports = mongoose.model('Project', projectSchema);