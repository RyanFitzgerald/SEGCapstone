var express = require('express');
var path = require ('path');
var api = require('./api/index.js');

app.get('/login', function(req, res){
    res.sendFile(path.join(__dirname + '/public/login.html'));
});

app.get('/dashboard', function(req, res){
    res.sendFile(path.join(__dirname + '/public/dashboard.html'));
});

app.get('/login-reset', function(req, res){
    res.sendFile(path.join(__dirname + '/public/login-reset.html'));
});

// API routes
app.use('/api', api);

// start the server
const port = 3000;
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port}`);
});
