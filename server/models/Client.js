/*
  Client Model
  - This file contains the model for clients
*/

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
require('dotenv').config({ path: 'variables.env' });
const NodeGeocoder  = require('node-geocoder');
var options = {
  provider: 'google',
  apiKey: process.env.GEOCODE_KEY,
  formatter: null
};
var geocoder = NodeGeocoder(options);

const clientSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: 'A name must be provided!',
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
  },
  /*soldBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'A salesman must be provided'
  }*/
}, {
  toJSON: { virtuals: true }, // Show virtuals explicitly, but not needed
  toObject: { virtuals: true } // Show virtuals explicitly, but not needed
});

clientSchema.virtual('notes', {
  ref: 'ClientNote',
  localField: '_id', // Which field on Store
  foreignField: 'client' // which field on Review
});

clientSchema.plugin(mongodbErrorHandler);

clientSchema.pre('save', async function(next) {
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

module.exports = mongoose.model('Client', clientSchema);