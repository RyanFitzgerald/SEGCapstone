// Import required packages
const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');

// import controllers
const clientController = require('../controllers/clientController');
const clientNoteController = require('../controllers/clientNoteController');
const projectController = require('../controllers/projectController');
const projectNoteController = require('../controllers/projectNoteController');
const productController = require('../controllers/productController');
const costUpdateController = require('../controllers/costUpdateController');
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
router.post('/api/clients/:id', catchErrors(clientController.editClient));
router.delete('/api/clients/:id', catchErrors(clientController.deleteClient));
router.post('/api/clients/:id/notes', catchErrors(clientNoteController.addNote));

// --- Project Routes ---
router.get('/api/projects', catchErrors(projectController.getProjects));
router.get('/api/projects/:id', catchErrors(projectController.getProject));
router.post('/api/projects', catchErrors(projectController.addProject));
router.post('/api/projects/:id', catchErrors(projectController.editProject));
router.delete('/api/projects/:id', catchErrors(projectController.deleteProject));
router.post('/api/projects/:id/notes', catchErrors(projectNoteController.addNote));
router.post('/api/projects/:id/products', catchErrors(productController.addProduct));
router.post('/api/projects/:id/updates', catchErrors(costUpdateController.addUpdate));

// --- Type Routes ---
router.get('/api/types', catchErrors(typeController.getTypes));

// --- User Routes ---
router.get('/api/account', userController.getUser)

// Export the router
module.exports = router;