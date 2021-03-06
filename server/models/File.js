/*
  File Model
  - This file contains the model for files to projects
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const fileSchema = new mongoose.Schema({
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
  file: {
    type: String,
    required: 'A link must be provided!',
    trim: true
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: 'A project must be provided!'
  },
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'A user must be provided'
  }
});

module.exports = mongoose.model('File', fileSchema);