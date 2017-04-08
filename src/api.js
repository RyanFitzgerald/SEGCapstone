import axios from 'axios';

// Get all clients
export const getClients = () => {
    return axios.get('/api/clients')
        .then(resp => resp.data.clients);
};

// Get client by ID
export const getClientByID = clientID => {
    return axios.get(`/api/clients/${clientID}`)
        .then(resp => resp.data[0]);
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

// Add client
export const addClient = (client) => {
    return axios.post('/api/clients', {
        clientName: client.clientName,
        email: client.email,
        telephone: client.telephone,
        street: client.street,
        postalCode: client.postalCode,
        cityID: client.cityID
    })
    .then(resp => resp.data);
};

// Edit client
export const editClient = (client) => {
    return axios.put('/api/clients', {
        clientID: client.clientID,
        clientName: client.clientName,
        email: client.email,
        telephone: client.telephone,
        street: client.street,
        postalCode: client.postalCode,
        cityID: client.cityID
    })
    .then(resp => resp.data);
};

// Delete Client by ID
export const deleteClient = (clientID) => {
    return axios.delete(`/api/clients/${clientID}`)
        .then(resp => resp.data.deleteSucessful);
};

// Get cities
export const getCities = () => {
    return axios.get('/api/cities')
        .then(resp => resp.data.cities);
};
