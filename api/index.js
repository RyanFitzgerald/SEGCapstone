import express from 'express';
import config from '../config';
var pgp = require('pg-promise')();

// Create router
const router = express.Router();

// Connect to db
const db = pgp(config.connectionString);

// GET Routes
router.get('/clients', (req, res) => {
    let query = 'SELECT * FROM client, city WHERE client.city_id=city.city_id';
    db.any(query)
    .then(data => {
        res.send({clients: data});
    })
    .catch(error => {
        console.error(error);
        res.status(404).send('Bad Request');
    });
});

router.get('/clients/:clientID', (req, res) => {
    let query = `SELECT * FROM client, city WHERE client_id=${req.params.clientID} AND client.city_id=city.city_id`;
    db.any(query)
    .then(data => {
        res.send(data);
    })
    .catch(error => {
        console.error(error);
        res.status(404).send('Bad Request');
    });
});

router.get('/projects', (req, res) => {
    let query = 'SELECT * FROM project';
    db.any(query)
    .then(data => {
        res.send({projects: data});
    })
    .catch(error => {
        console.error(error);
        res.status(404).send('Bad Request');
    });
});

router.get('/projects/:projectID', (req, res) => {
    let query = `SELECT * FROM project WHERE project_id=${req.params.projectID}`;
    db.any(query)
    .then(data => {
        res.send({projects: data});
    })
    .catch(error => {
        console.error(error);
        res.status(404).send('Bad Request');
    });
});

router.get('/cities', (req, res) => {
    let query = 'SELECT * FROM city';
    db.any(query)
    .then(data => {
        res.send({cities: data});
    })
    .catch(error => {
        console.error(error);
        res.status(404).send('Bad Request');
    });
});

router.get('*', function(req, res) {
    res.status(404).send('404 - Bad Request');
});

// POST Routes
router.post('/clients', (req, res) => {
    const newClient = req.body;
    let query = 'INSERT INTO client(date_created, name, telephone, email, street, postal_code, city_id) VALUES (now(), $1, $2, $3, $4, $5, $6) RETURNING client_id';
    db.one(query, [`${newClient.clientName}`, `${newClient.telephone}`, `${newClient.email}`, `${newClient.street}`, `${newClient.postalCode}`, `${newClient.cityID}`])
    .then(data => {
        res.send({clientID: data.client_id});
    })
    .catch(error => {
        console.error(error);
        res.status(404).send('Bad Request');
    });
});

// PUT Routes
router.put('/clients', (req, res) => {
    const updateClient = req.body;
    let query = `UPDATE client SET name='${updateClient.clientName}', telephone='${updateClient.telephone}', email='${updateClient.email}', street='${updateClient.street}', postal_code='${updateClient.postalCode}', city_id=${updateClient.cityID} WHERE client_id=${updateClient.clientID}`;
    db.any(query)
    .then(() => {
        res.send({clientID: updateClient.clientID});
    })
    .catch(error => {
        console.error(error);
        res.status(404).send('Bad Request');
    });
});

// DELETE Routes
router.delete('/clients/:clientID', (req, res) => {
    let query = `DELETE FROM client WHERE client_id=${req.params.clientID}`;
    db.any(query)
    .then(() => {
        res.send({deleteSuccessful: 1});
    })
    .catch(error => {
        console.error(error);
        res.status(404).send('Bad Request');
    });
});

// Export api router
export default router;
