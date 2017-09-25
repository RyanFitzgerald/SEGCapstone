/*
  Cost Update Model
  - This file contains the model for adding cost updates to a project
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const costUpdateSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: 'An amount must be provided!'
  },
  reason: {
    type: String,
    required: 'A reason must be provided!',
    trim: true
  },
  type: {
    type: String,
    required: 'A type must be provided!'
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: 'A project must be provided!'
  },
  /*user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'A user must be provided!'
  }*/
});

module.exports = mongoose.model('CostUpdate', costUpdateSchema);