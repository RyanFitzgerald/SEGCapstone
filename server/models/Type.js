/*
  Type Model
  - This file contains the model for types of projects
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'A name must be provided!',
    trim: true
  }
});

module.exports = mongoose.model('Type', typeSchema);