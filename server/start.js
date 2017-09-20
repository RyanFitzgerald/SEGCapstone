const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`ERROR → ${err.message}`);
});

// Import all models
require('./models/Client');
require('./models/ClientNote');
require('./models/Project');
require('./models/Type');

// Require app with config
const app = require('./app');

// Set the port
app.set('port', process.env.PORT || 7777);

// Listen on the port
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});