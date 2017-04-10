import express from 'express';
import config from '../config';
var pgp = require('pg-promise')();

// Create router
const router = express.Router();

// Connect to db
const db = pgp(config.connectionString);

// GET Routes
router.get('/clients', (req, res) => {
    let query;
    if (Object.keys(req.query).length !== 0) {
        if (parseInt(req.query.city) !== 0) {
            query = `SELECT * FROM client, city WHERE client.city_id=city.city_id AND LOWER(client.name) LIKE LOWER('%${req.query.name}%') AND client.city_id=${parseInt(req.query.city)}`;
        } else {
            query = `SELECT * FROM client, city WHERE client.city_id=city.city_id AND LOWER(client.name) LIKE LOWER('%${req.query.name}%')`;
        }

    } else {
        query = 'SELECT * FROM client, city WHERE client.city_id=city.city_id';
    }
    db.any(query)
    .then(data => {
        res.send({clients: data});
    })
    .catch(error => {
        console.error(error);
        res.status(404).send('Bad Request');
    });
});

router.get('/clients/:clientID/projects', (req, res) => {
    let query = `SELECT * FROM project, city, project_type WHERE project.client_id=${req.params.clientID} AND project.city_id=city.city_id AND project.project_type=project_type.type_id`;
    db.any(query)
    .then(data => {
        res.send({projects: data});
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
    let query;
    if (Object.keys(req.query).length !== 0) {
        if (parseInt(req.query.city) !== 0 && parseInt(req.query.type) === 0) {
            query = `SELECT * FROM project, city, project_type WHERE project.city_id=city.city_id AND project.project_type=project_type.type_id AND LOWER(project.name) LIKE LOWER('%${req.query.name}%') AND project.city_id=${req.query.city}`;
        } else if (parseInt(req.query.city) === 0 && parseInt(req.query.type) !== 0) {
            query = `SELECT * FROM project, city, project_type WHERE project.city_id=city.city_id AND project.project_type=project_type.type_id AND LOWER(project.name) LIKE LOWER('%${req.query.name}%') AND project.project_type=${req.query.type}`;
        } else if (parseInt(req.query.city) !== 0 && parseInt(req.query.type) !== 0) {
            query = `SELECT * FROM project, city, project_type WHERE project.city_id=city.city_id AND project.project_type=project_type.type_id AND LOWER(project.name) LIKE LOWER('%${req.query.name}%') AND project.project_type=${req.query.type} AND project.city_id=${req.query.city}`;
        } else {
            query = `SELECT * FROM project, city, project_type WHERE project.city_id=city.city_id AND project.project_type=project_type.type_id AND LOWER(project.name) LIKE LOWER('%${req.query.name}%')`;
        }
    } else {
        query = 'SELECT * FROM project, city, project_type WHERE project.city_id=city.city_id AND project.project_type=project_type.type_id';
    }
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
    let query = `SELECT * FROM project, city, project_type WHERE project_id=${req.params.projectID} AND project.city_id=city.city_id AND project.project_type=project_type.type_id`;
    db.any(query)
    .then(data => {
        res.send(data);
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

router.get('/projectTypes', (req, res) => {
    let query = 'SELECT * FROM project_type';
    db.any(query)
    .then(data => {
        res.send({projectTypes: data});
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

router.post('/projects', (req, res) => {
    const newProject = req.body;
    let query = `INSERT INTO project(date_created, name, description, street, postal_code, city_id, start_date, end_date, estimated_cost, final_cost, contract, client_id, project_status, project_type) VALUES (now(), '${newProject.projectName}', '${newProject.projectDescription}', '${newProject.street}', '${newProject.postalCode}', ${newProject.cityID}, '${newProject.startDate}', '${newProject.endDate}', NULLIF(${newProject.estimatedCost}, -1), NULLIF(${newProject.finalCost}, -1), '${newProject.contract}', ${newProject.clientID}, 1, ${newProject.projectType}) RETURNING project_id`;
    db.any(query)
    .then(data => {
        res.send({projectID: data[0].project_id});
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

router.put('/projects', (req, res) => {
    const updateProject = req.body;
    let query = `UPDATE project SET name='${updateProject.projectName}', description='${updateProject.projectDescription}', street='${updateProject.street}', postal_code='${updateProject.postalCode}', city_id=${updateProject.cityID}, start_date='${updateProject.startDate}', end_date='${updateProject.endDate}', estimated_cost=NULLIF(${updateProject.estimatedCost}, -1), final_cost=NULLIF(${updateProject.finalCost}, -1), contract='${updateProject.contract}', client_id=${updateProject.clientID}, project_type=${updateProject.projectType} WHERE project_id=${updateProject.projectID}`;
    db.any(query)
    .then(() => {
        res.send({projectID: updateProject.projectID});
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

router.delete('/projects/:projectID', (req, res) => {
    let query = `DELETE FROM project WHERE project_id=${req.params.projectID}`;
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
