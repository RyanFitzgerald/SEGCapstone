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
  fileNumber: {
    type: String,
    unique: true,
    required: 'A file number must be provided',
    trim: true
  },
  houseNumber: {
    type: String,
    required: 'A house number must be provided!',
    trim: true
  },
  street: {
    type: String,
    required: 'A street must be provided!',
    trim: true
  },
  city: {
    type: String,
    required: 'A city must be provided!',
    trim: true
  },
  postalCode: {
    type: String,
    required: 'A postal code must be provided!',
    trim: true
  },
  soldDate: {
    type: Date,
    required: 'A sold date must be provided'
  },
  startDate: Date,
  endDate: Date,
  cashinDate: Date,
  labourCost: {
    type: Number,
    default: 0
  },
  materialsCost: {
    type: Number,
    default: 0
  },
  par: {
    type: Number,
    default: 0
  },
  salesPrice: {
    type: Number,
    default: 0
  },
  status: String,
  type: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Type',
    required: 'A type must be provided'
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
      type: String,
      default: 'Ottawa, ON, Canada'
    }
  },
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'A user must be provided'
  }
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

projectSchema.virtual('photos', {
  ref: 'Photo',
  localField: '_id', // Which field on project
  foreignField: 'project' // which field on update
});

projectSchema.virtual('files', {
  ref: 'File',
  localField: '_id', // Which field on project
  foreignField: 'project' // which field on update
});

projectSchema.pre('save', async function(next) {
  const address = `${this.houseNumber} ${this.street}`;
  const postalCode = this.postalCode;

  geocoder.geocode({address, country: 'Canada', zipcode: postalCode})
    .then(res => {
      let long = res[0].longitude;
      let lat = res[0].latitude;
      let formattedAddress = res[0].formattedAddress;

      this.location.coordinates = [long, lat];
      this.location.address = formattedAddress;

      next();
    })
    .catch(err => {
      console.error(err);
      next();
    });
});

projectSchema.pre('save', async function(next) {
  const materialsCost = this.materialsCost;
  const labourCost = this.labourCost;
  
  if (labourCost !== 0 && materialsCost !== 0) {
    this.par = (labourCost + materialsCost) * 2.1;
  }  

  next();
});

projectSchema.pre('findOneAndUpdate', async function(next) {
  const materialsCost = this._update.materialsCost;
  const labourCost = this._update.labourCost;
  
  if (labourCost && labourCost !== 0 && materialsCost && materialsCost !== 0) {
    this._update.par = (labourCost + materialsCost) * 2.1;
  }

  next();
});

module.exports = mongoose.model('Project', projectSchema);