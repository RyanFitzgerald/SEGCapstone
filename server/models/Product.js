/*
  Product Model
  - This file contains the model for adding products to projects
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'A name must be provided!',
    trim: true
  },
  brand: {
    type: String,
    required: 'A brand must be provided!',
    trim: true
  },
  colour: {
    type: String,
    required: 'A colour must be provided!',
    trim: true
  },
  style: {
    type: String,
    required: 'A style must be provided!',
    trim: true
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: 'A project must be provided!'
  },
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'A user must be provided'
  }
});

module.exports = mongoose.model('Product', productSchema);