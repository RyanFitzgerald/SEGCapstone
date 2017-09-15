/*
  Client Model
  - This file contains the model for clients
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const clientSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  firstName: {
    type: String,
    required: 'A first name must be provided!',
    trim: true
  },
  lastName: {
    type: String,
    required: 'A first name must be provided!',
    trim: true
  },
  telephone: {
    type: String,
    required: 'A telephone must be provided!',
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: 'A email must be provided!',
    trim: true,
    validate: {
      isAsync: true,
      validator: function(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid email!'
    }
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
  /*soldBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'A salesman must be provided'
  }*/
});

clientSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Client', clientSchema);