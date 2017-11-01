// Import required packages
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressValidator = require('express-validator');
const routes = require('./routes/index');
const helpers = require('../helpers');
const errorHandlers = require('./handlers/errorHandlers');
const validateHandler = require('./handlers/validateHandler');
require('./handlers/passport');

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

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

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

// Setup some basic security
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Auth middleware
app.all('/api/*', [validateHandler]);

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