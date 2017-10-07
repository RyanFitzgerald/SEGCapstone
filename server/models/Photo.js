/*
  Photo Model
  - This file contains the model for adding photos to projects
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const photoSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: 'A name must be provided!',
    trim: true
  },
  description: String,
  photo: {
    type: String,
    required: 'A link must be provided!',
    trim: true
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: 'A project must be provided!'
  }
});

module.exports = mongoose.model('Photo', photoSchema);