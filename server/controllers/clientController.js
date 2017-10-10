/*
  Client Controller
  - This file contains all the backend API logic for clients
*/

const mongoose = require('mongoose');
const Client = mongoose.model('Client');

exports.getClients = async (req, res) => {
  const filter = {};
  let skip = 0;
  let limit = 10;

  //Check for name search
  if (req.query.q) {
    filter.name = { $regex: new RegExp(req.query.q), $options: 'i' };
  }

  // Check for city
  if (req.query.city) {
    filter.city = req.query.city;
  }

  // Check for postal code
  if (req.query.postalCode) {
    filter.postalCode = { $regex: new RegExp(req.query.postalCode), $options: 'i' };
  }

  // Check for street
  if (req.query.street) {
    filter.street = { $regex: new RegExp(req.query.street), $options: 'i' };
  }

  // Check for page
  if (req.query.page) {
    skip = (req.query.page - 1) * 10;
    if (req.query.page === 'all') {
      limit = 999999;
    }
  }

  const clientsPromise = await Client.find(filter).populate('projects').sort({ 'created': -1 }).limit(limit).skip(skip);
  const countPromise = Client.find(filter).count();

  const [clients, count] = await Promise.all([clientsPromise, countPromise]);
  res.send({clients, count});
};

exports.getClient = async (req, res) => {
  const client = await Client.findById(req.params.id).populate('notes projects');
  res.send(client);
};

exports.addClient = async (req, res) => {
  const client = await (new Client(req.body)).save();
  res.send(client._id);
};

exports.editClient = async (req, res) => {
  const client = await Client.findOneAndUpdate({ _id: req.params.id }, req.body, {
    runValidators: true
  }).exec();
  res.send(req.params.id);
};

exports.deleteClient = async (req, res) => {
  const client = await Client.findById(req.params.id);
  client.remove();
  res.send(true);
}