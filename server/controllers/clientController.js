/*
  Client Controller
  - This file contains all the backend API logic for clients
*/

const mongoose = require('mongoose');
const Client = mongoose.model('Client');

exports.getClients = async (req, res) => {
  const filter = {};

  // Check for name search
  if (req.query.q) {
    filter.lastName = { $regex: new RegExp(req.query.q), $options: 'i' };
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

  // Check for salesman
  if (req.query.salesman) {
    filter.soldBy = req.query.salesman;
  }

  const clients = await Client.find(filter).populate('projects').sort({ 'created': -1 });

  res.send(clients);
};

exports.getClient = async (req, res) => {
  const client = await Client.findById(req.params.id).populate('projects referral soldBy addedBy').populate({
    path: 'notes',
    model: 'ClientNote',
    populate: {
      path: 'addedBy',
      select: 'name',
      model: 'User'
    }
  });
  res.send(client);
};

exports.addClient = async (req, res) => {
  const client = await (new Client(req.body)).save();
  res.send(client._id);
};

exports.editClient = async (req, res) => {
  const client = await Client.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  }).exec();
  res.send(client);
};

exports.deleteClient = async (req, res) => {
  const client = await Client.findById(req.params.id);
  client.remove();
  res.send({message: 'Deleted Successfully!', deleted: true});
}