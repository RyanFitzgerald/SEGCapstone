// Import required packages
const express = require('express');
const mongoose = require('mongoose');
//const MongoStore = require('connect-mongo')(session);
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressValidator = require('express-validator');
const routes = require('./routes/index');
const helpers = require('../helpers');
const errorHandlers = require('./handlers/errorHandlers');

// create our Express app
const app = express();

// Serve up static files from the client build folder
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
}

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Exposes a bunch of methods for validating data
app.use(expressValidator());

// Setup Passport
app.use(passport.initialize());
app.use(passport.session());

// Pass variables to templates and all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.user = req.user || null;
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