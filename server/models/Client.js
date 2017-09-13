/*
  Client Model
  - This file contains the model for clients
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const clientSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Client', clientSchema);