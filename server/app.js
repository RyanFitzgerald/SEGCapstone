// Import required packages
const express = require('express');
const mongoose = require('mongoose');
//const MongoStore = require('connect-mongo')(session);
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const routes = require('./routes/index');
const helpers = require('../helpers');
const errorHandlers = require('./handlers/errorHandlers');

// create our Express app
const app = express();

// Serve up static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Exposes a bunch of methods for validating data
app.use(expressValidator());

// Pass variables to templates and all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.currentPath = req.path;
  next();
});

// After all middleware, handle routes
app.use('/', routes);

// If above routes don't work, 404 and forward to error handler
app.use(errorHandlers.notFound);

// For real errors
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// Production error handler
app.use(errorHandlers.productionErrors);

// Export for use in start.js
module.exports = app;