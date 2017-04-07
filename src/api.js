import axios from 'axios';

// Get all clients
export const getClients = () => {
    return axios.get('/api/clients')
        .then(resp => resp.data);
};

// Get client by ID
export const getClientByID = clientID => {
    return axios.get(`/api/clients/${clientID}`)
        .then(resp => resp.data);
};

// Get all projects
export const getProjects = () => {
    return axios.get('/api/projects')
        .then(resp => resp.data);
};

// Get project by ID
export const getProjectByID = projectID => {
    return axios.get(`/api/projects/${projectID}`)
        .then(resp => resp.data);
};
