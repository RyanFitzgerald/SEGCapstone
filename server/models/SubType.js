/*
  SubType Model
  - This file contains the model for subtypes of projects
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const subTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'A name must be provided!',
    trim: true
  },
  type: {
    type: mongoose.Schema.ObjectId,
    ref: 'Type',
    required: 'A type must be provided!'
  }
});

module.exports = mongoose.model('SubType', subTypeSchema);