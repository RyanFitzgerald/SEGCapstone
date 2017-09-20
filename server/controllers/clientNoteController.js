/*
  Client Note Controller
  - This file contains all the backend API logic for client notes
*/

const mongoose = require('mongoose');
const ClientNote = mongoose.model('ClientNote');

exports.addNote = async (req, res) => {
  const note = await (new ClientNote(req.body)).save();
  res.send(true);
};
