import config from './config';
import apiRouter from './api';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const server = express();

server.use(bodyParser.json());

server.use('/api', apiRouter);
server.use(express.static('public'));

// Show login
server.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/login.html'));
});

// Send all routes the index
server.get('*', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

server.listen(config.port, config.host, () => {
    console.info('Express listening on port', config.port);
});
