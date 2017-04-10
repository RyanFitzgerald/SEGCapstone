import axios from 'axios';

// Get all clients
export const getClients = () => {
    return axios.get('/api/clients')
        .then(resp => resp.data.clients);
};

// Search clients
export const searchClients = query => {
    return axios.get(`/api/clients?name=${query.name}&city=${query.city}`)
        .then(resp => resp.data.clients);
};

// Get client by ID
export const getClientByID = clientID => {
    return axios.get(`/api/clients/${clientID}`)
        .then(resp => resp.data[0]);
};

// Get all projects by Client ID
export const getProjectsByClientID = clientID => {
    return axios.get(`/api/clients/${clientID}/projects`)
        .then(resp => resp.data.projects);
};

// Get all projects
export const getProjects = () => {
    return axios.get('/api/projects')
        .then(resp => resp.data.projects);
};

// Search Projects
export const searchProjects = query => {
    return axios.get(`/api/projects?name=${query.name}&city=${query.city}&type=${query.type}`)
        .then(resp => resp.data.projects);
};

// Get project by ID
export const getProjectByID = projectID => {
    return axios.get(`/api/projects/${projectID}`)
        .then(resp => resp.data[0]);
};

// Add client
export const addClient = client => {
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

// Add project
export const addProject = project => {
    return axios.post('/api/projects', {
        projectName: project.projectName,
        projectDescription: project.projectDescription,
        street: project.street,
        postalCode: project.postalCode,
        cityID: project.cityID,
        startDate: project.startDate,
        endDate: project.endDate,
        estimatedCost: project.estimatedCost,
        finalCost: project.finalCost,
        clientID: project.clientID,
        contract: 'contract',
        projectType: project.projectType
    })
    .then(resp => resp.data);
};

// Edit client
export const editClient = client => {
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

// Edit Project
export const editProject = project => {
    return axios.put('/api/projects', {
        projectID: project.projectID,
        projectName: project.projectName,
        projectDescription: project.projectDescription,
        street: project.street,
        postalCode: project.postalCode,
        cityID: project.cityID,
        startDate: project.startDate,
        endDate: project.endDate,
        estimatedCost: project.estimatedCost,
        finalCost: project.finalCost,
        clientID: project.clientID,
        contract: 'contract',
        projectType: project.projectType
    })
    .then(resp => resp.data);
};

// Delete Client by ID
export const deleteClient = clientID => {
    return axios.delete(`/api/clients/${clientID}`)
        .then(resp => resp.data.deleteSucessful);
};

// Delete Project by ID
export const deleteProject = projectID => {
    return axios.delete(`/api/projects/${projectID}`)
        .then(resp => resp.data.deleteSucessful);
};

// Get cities
export const getCities = () => {
    return axios.get('/api/cities')
        .then(resp => resp.data.cities);
};

// Get all projects
export const getProjectTypes = () => {
    return axios.get('/api/projectTypes')
        .then(resp => resp.data.projectTypes);
};
