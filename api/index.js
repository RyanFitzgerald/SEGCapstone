import express from 'express';
import config from '../config';
var pgp = require('pg-promise')();

// Create router
const router = express.Router();

// Connect to db
const db = pgp(config.connectionString);

// GET Routes
router.get('/clients', (req, res) => {
    let query = 'SELECT * FROM client';
    db.any(query)
    .then(data => {
        res.send({clients: data});
    });
});

router.get('/clients/:clientID', (req, res) => {
    let query = `SELECT * FROM client WHERE client_id=${req.params.clientID}`;
    db.any(query)
    .then(data => {
        res.send({clients: data});
    });
});

router.get('/projects', (req, res) => {
    let query = 'SELECT * FROM project';
    db.any(query)
    .then(data => {
        res.send({projects: data});
    });
});

router.get('/projects/:projectID', (req, res) => {
    let query = `SELECT * FROM project WHERE project_id=${req.params.projectID}`;
    db.any(query)
    .then(data => {
        res.send({projects: data});
    });
});

router.get('*', function(req, res) {
    res.status(404).send('404 - Bad Request');
});

// Export api router
export default router;
