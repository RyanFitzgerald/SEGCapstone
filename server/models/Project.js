/*
  Project Model
  - This file contains the model for projects
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');
require('dotenv').config({ path: 'variables.env' });
const NodeGeocoder  = require('node-geocoder');
var options = {
  provider: 'google',
  apiKey: process.env.GEOCODE_KEY,
  formatter: null
};
var geocoder = NodeGeocoder(options);

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
  labourCost: Number,
  materialsCost: Number,
  actualCost: Number,
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
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [-75.69719309999999, 45.4215296]
    },
    address: {
      type:String,
      default: 'Ottawa, ON, Canada'
    }
  }
  /*createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'A user must be provided'
  }*/
}, {
  toJSON: { virtuals: true }, // Show virtuals explicitly, but not needed
  toObject: { virtuals: true } // Show virtuals explicitly, but not needed
});

projectSchema.plugin(mongodbErrorHandler);

projectSchema.virtual('notes', {
  ref: 'ProjectNote',
  localField: '_id', // Which field on project
  foreignField: 'project' // which field on note
});

projectSchema.virtual('products', {
  ref: 'Product',
  localField: '_id', // Which field on project
  foreignField: 'project' // which field on product
});

projectSchema.virtual('updates', {
  ref: 'CostUpdate',
  localField: '_id', // Which field on project
  foreignField: 'project' // which field on update
});


projectSchema.pre('save', async function(next) {
  const street = this.street;
  const postalCode = this.postalCode;

  geocoder.geocode({address: street, country: 'Canada', zipcode: postalCode})
    .then(res => {
      let long = res[0].longitude;
      let lat = res[0].latitude;
      let address = res[0].formattedAddress;

      this.location.coordinates = [long, lat];
      this.location.address = address;

      next();
    })
    .catch(err => {
      console.error(err);
      next();
    });  
});

module.exports = mongoose.model('Project', projectSchema);