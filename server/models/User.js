/*
  User Model
  - This file contains the model for users
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Please supply an email address',
    validate: {
      isAsync: true,
      validator: function(email) {
          return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid email!'
    }
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  role: {
    type: mongoose.Schema.ObjectId,
    ref: 'Role',
    required: 'A role must be provided!'
  }
}, {
  toJSON: {
    virtuals: true
  }
});

userSchema.plugin(passportLocalMongoose, { 
  usernameField: 'email',
  populateFields: 'role'
});
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);