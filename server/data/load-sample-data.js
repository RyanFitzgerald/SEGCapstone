require('dotenv').config({ path: __dirname + '/../../variables.env' });
const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// Get data
const clients = JSON.parse(fs.readFileSync(__dirname + '/clients.json', 'utf-8'));
const projects = JSON.parse(fs.readFileSync(__dirname + '/projects.json', 'utf-8'));
const types = JSON.parse(fs.readFileSync(__dirname + '/types.json', 'utf-8'));

// Import required models
const Client = require('../models/Client');
const Project = require('../models/Project');
const Type = require('../models/Type');

// Delete all sample data
async function deleteData() {
  console.log('Deleting Data...');
  await Client.remove();
  await Project.remove();
  await Type.remove();
  console.log('Data Deleted.');
  process.exit();
}

// Add all sample data
async function loadData() {
  try {
    console.log('Adding Data...');
    await Client.insertMany(clients);
    await Project.insertMany(projects);
    await Type.insertMany(types);
    console.log('Data added.');
    process.exit();
  } catch(e) {
    console.log('Error! The sample data could not be added.');
    console.log(e);
    process.exit();
  }
}

if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}