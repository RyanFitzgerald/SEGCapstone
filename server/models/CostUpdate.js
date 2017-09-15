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
    required: 'A first name must be provided!',
    trim: true
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: 'A client must be provided!'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'A user must be provided!'
  }
});

module.exports = mongoose.model('CostUpdate', costUpdateSchema);