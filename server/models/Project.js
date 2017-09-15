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
  name: {
    type: String,
    unique: true,
    required: 'A project name must be provided!',
    trim: true
  },
  street: {
    type: String,
    required: 'A street must be provided!',
    trim: true
  },
  postalCode: {
    type: String,
    required: 'A postal code must be provided!',
    trim: true
  },
  city: {
    type: String,
    required: 'A city must be provided!',
    trim: true
  },
  soldDate: {
    type: Date,
    required: 'A sold date must be provided'
  },
  startDate: Date,
  endDate: Date,
  cashinDate: Date,
  labourCost: String,
  materialsCost: String,
  actualCost: String,
  status: String,
  type: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Type',
    required: 'A type must be provided'
  }],
  subtype: [{
    type: mongoose.Schema.ObjectId,
    ref: 'SubType'
  }],
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: 'A client must be provided'
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'A user must be provided'
  }
});

module.exports = mongoose.model('Project', projectSchema);