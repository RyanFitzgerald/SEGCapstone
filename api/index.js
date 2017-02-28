var express = require('express');
var router = express.Router();

var db = require('../queries');

// API routes
router.get('/projects', db.getAllProjects);
router.get('/projects/search', db.getProjectsByName);
router.get('/projects/:id', db.getSingleProject);

module.exports = router;
