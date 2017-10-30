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
const photoController = require('../controllers/photoController');
const fileController = require('../controllers/fileController');
const typeController = require('../controllers/typeController');
const authController = require('../controllers/authController');
const roleController = require('../controllers/roleController');

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
router.delete('/api/clients/:id/notes/:note', catchErrors(clientNoteController.deleteNote));

// --- Project Routes ---
router.get('/api/projects', catchErrors(projectController.getProjects));
router.get('/api/projects/:id', catchErrors(projectController.getProject));
router.post('/api/projects', catchErrors(projectController.addProject));
router.post('/api/projects/:id', catchErrors(projectController.editProject));
router.delete('/api/projects/:id', catchErrors(projectController.deleteProject));
router.post('/api/projects/:id/notes', catchErrors(projectNoteController.addNote));
router.delete('/api/projects/:id/notes/:note', catchErrors(projectNoteController.deleteNote));
router.post('/api/projects/:id/products', catchErrors(productController.addProduct));
router.delete('/api/projects/:id/products/:product', catchErrors(productController.deleteProduct));
router.post('/api/projects/:id/updates', catchErrors(costUpdateController.addUpdate));
router.delete('/api/projects/:id/updates/:update', catchErrors(costUpdateController.deleteUpdate));
router.post('/api/projects/:id/photos', photoController.uploadPhoto, catchErrors(photoController.resize), catchErrors(photoController.addPhoto));
router.delete('/api/projects/:id/photos/:photo', catchErrors(photoController.deletePhoto));
router.post('/api/projects/:id/files', fileController.uploadFile, catchErrors(fileController.write), catchErrors(fileController.addFile));
router.delete('/api/projects/:id/files/:file', catchErrors(fileController.deleteFile));

// --- Type Routes ---
router.get('/api/types', catchErrors(typeController.getTypes));

// --- Authenticaiton Routes ---
router.get('/api/isLoggedIn', authController.isLoggedIn);
router.post('/api/login', authController.login);
router.get('/api/logout', authController.logout);
router.get('/api/getCurrentUser', authController.getCurrentUser);

// --- User Routes ---
router.get('/api/users', catchErrors(userController.getUsers));
router.get('/api/users/:id', catchErrors(userController.getUser));
router.post('/api/users', catchErrors(userController.addUser));
router.post('/api/users/:id', catchErrors(userController.editUser));
router.delete('/api/users/:id',catchErrors(userController.deleteUser));

// --- Role Roles ---
router.get('/api/roles', catchErrors(roleController.getRoles));

// Export the router
module.exports = router;