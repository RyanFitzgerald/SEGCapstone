/*
  Client Notes Model
  - This file contains the model for notes on the client side
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const clientNoteSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: 'A first name must be provided!',
    trim: true
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: 'A client must be provided!'
  },
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'A user must be provided'
  }
});

module.exports = mongoose.model('ClientNote', clientNoteSchema);