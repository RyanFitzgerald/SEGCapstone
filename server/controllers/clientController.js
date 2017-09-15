/*
  Client Controller
  - This file contains all the backend API logic for clients
*/

const mongoose = require('mongoose');
const Client = mongoose.model('Client');

exports.getClients = async (req, res) => {
  const clients = await Client.find();
  res.send(clients);
};

exports.getClient = async (req, res) => {
  console.log(req.params.id);
  const client = await Client.findById(req.params.id);
  res.send(client);
};

exports.addClient = async (req, res) => {
  const client = await (new Client(req.body)).save();
  res.send(client._id);
};