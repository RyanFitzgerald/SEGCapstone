/*
  Project Notes Model
  - This file contains the model for notes on the client side
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const projectNoteSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: 'A first name must be provided!',
    trim: true
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: 'A project must be provided!'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'A user must be provided!'
  }
});

module.exports = mongoose.model('ProjectNote', projectNoteSchema);