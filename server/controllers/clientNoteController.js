/*
  Client Note Controller
  - This file contains all the backend API logic for client notes
*/

const mongoose = require('mongoose');
const ClientNote = mongoose.model('ClientNote');

exports.getNotes = async (req, res) => {
  const notes = await ClientNote.find({ client: req.params.id });
  res.send(notes);
};

exports.addNote = async (req, res) => {
  const note = await (new ClientNote(req.body)).save();
  res.send(true);
};
