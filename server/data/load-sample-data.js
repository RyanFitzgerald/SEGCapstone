require('dotenv').config({ path: __dirname + '/../../variables.env' });
const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// Get data
const clients = JSON.parse(fs.readFileSync(__dirname + '/clients.json', 'utf-8'));
const clientNotes = JSON.parse(fs.readFileSync(__dirname + '/clients-notes.json', 'utf-8'));
const projects = JSON.parse(fs.readFileSync(__dirname + '/projects.json', 'utf-8'));
const projectNotes = JSON.parse(fs.readFileSync(__dirname + '/projects-notes.json', 'utf-8'));
const types = JSON.parse(fs.readFileSync(__dirname + '/types.json', 'utf-8'));
const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'));

// Import required models
const Client = require('../models/Client');
const ClientNote = require('../models/ClientNote');
const Project = require('../models/Project');
const ProjectNote = require('../models/ProjectNote');
const Type = require('../models/Type');
const User = require('../models/User');

// Delete all sample data
async function deleteData() {
  try {
    console.log('Deleting Data...');
    await Client.remove();
    await ClientNote.remove();
    await Project.remove();
    await ProjectNote.remove();
    await Type.remove();
    await User.remove();
    console.log('🖒 Data Deleted. 🖒');
    process.exit();
  } catch(e) {
    console.log('🖓 A Problem Occurred Deleting Data 🖓');
    console.log(e);
    process.exit();
  }
}

// Add all sample data
async function loadData() {
  try {
    console.log('Adding Data...');
    await Type.insertMany(types);
    await Client.insertMany(clients);
    await ClientNote.insertMany(clientNotes);
    await Project.insertMany(projects);
    await ProjectNote.insertMany(projectNotes);
    await User.insertMany(users);
    console.log('🖒 Data added. 🖒');
    process.exit();
  } catch(e) {
    console.log('🖓 Error! The sample data could not be added. 🖓');
    console.log(e);
    process.exit();
  }
}

if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}