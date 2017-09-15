// Import required packages
const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');

// import controllers
const clientController = require('../controllers/clientController');
const projectController = require('../controllers/projectController');
const userController = require('../controllers/userController');
const typeController = require('../controllers/typeController');

// --- Static Routes ---

router.get('/', (req, res) => {
  res.send('Server');
});

// --- Client Routes ---
router.get('/api/clients', catchErrors(clientController.getClients));
router.get('/api/clients/:id', catchErrors(clientController.getClient));
router.post('/api/clients', catchErrors(clientController.addClient));

// --- Project Routes ---
router.get('/api/projects', projectController.getProjects);

// --- Type Routes ---
router.get('/api/types', catchErrors(typeController.getTypes));

// --- User Routes ---
router.get('/api/account', userController.getUser)

// Export the router
module.exports = router;