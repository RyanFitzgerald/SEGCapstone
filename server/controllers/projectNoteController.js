/*
  Project Note Controller
  - This file contains all the backend API logic for project notes
*/

const mongoose = require('mongoose');
const ProjectNote = mongoose.model('ProjectNote');

exports.addNote = async (req, res) => {
  const note = await (new ProjectNote(req.body)).save();
  res.send(true);
};
