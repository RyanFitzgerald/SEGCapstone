const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle an bad connections
if (process.env.NODE_ENV === 'test') {
  mongoose.connect(process.env.DATABASE_TEST);
} else {
  mongoose.connect(process.env.DATABASE);
}
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`ERROR → ${err.message}`);
});

// Import all models
require('./models/Client');
require('./models/ClientNote');
require('./models/Project');
require('./models/ProjectNote');
require('./models/Product');
require('./models/CostUpdate');
require('./models/Photo');
require('./models/File');
require('./models/Type');
require('./models/User');

// Require app with config
const app = require('./app');

// Set the port
app.set('port', process.env.PORT || 7777);

// Listen on the port
const server = app.listen(app.get('port'), () => {
  console.log(`Express running on PORT ${server.address().port}`);
});

module.exports = server;