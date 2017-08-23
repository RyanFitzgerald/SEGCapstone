// Import required packages
const express = require('express');
const router = express.Router();

// import controllers
const clientController = require('../controllers/clientController');
const projectController = require('../controllers/projectController');
const userController = require('../controllers/userController');

// --- Static Routes ---

router.get('/', (req, res) => {
  res.send('API Landing Page');
});

// --- Client Routes ---
router.get('/clients', clientController.getClients);

// --- Project Routes ---
router.get('/projects', projectController.getProjects);

// --- User Routes ---
router.get('/account', userController.getUser)

// Export the router
module.exports = router;