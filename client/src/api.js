import axios from 'axios';

// --- Client API ---
export const getClients = () => {
  return axios
    .get('/api/clients')
    .then(resp => resp.data);
};

export const searchClients = query => {
  return axios
    .get(`/api/clients?q=${query.q}&postalCode=${query.postalCode}&city=${query.city}&street=${query.street}`)
    .then(resp => resp.data);
};

export const getClient = id => {
  return axios
    .get(`/api/clients/${id}`)
    .then(resp => resp.data);
};

export const addClient = client => {
  return axios
    .post('/api/clients', client)
    .then(resp => resp.data);
}

export const updateClient = (client, id) => {
  return axios
    .post(`/api/clients/${id}`, client)
    .then(resp => resp.data);
}

export const deleteClient = id => {
  return axios
    .delete(`/api/clients/${id}`)
    .then(resp => resp.data);
}

// --- Client Notes Api ---
export const addClientNote = note => {
  return axios
    .post(`/api/clients/${note.client}/notes`, note)
    .then(resp => resp.data);
};

// --- Project API ---
export const getProjects = () => {
  return axios
    .get('/api/projects')
    .then(resp => resp.data);
};

export const getProject = id => {
  return axios
    .get(`/api/projects/${id}`)
    .then(resp => resp.data);
};

export const searchProjects = query => {
  console.log(query)
  return axios
    .get(`/api/projects?q=${query.q}&postalCode=${query.postalCode}&city=${query.city}&street=${query.street}&type=${query.type}&status=${query.status}`)
    .then(resp => resp.data);
};

export const addProject = project => {
  console.log(project)
  return axios
    .post('/api/projects', project)
    .then(resp => resp.data);
}

export const updateProject = (project, id) => {
  return axios
    .post(`/api/projects/${id}`, project)
    .then(resp => resp.data);
}

export const deleteProject = id => {
  return axios
    .delete(`/api/projects/${id}`)
    .then(resp => resp.data);
}

// --- Project Notes Api ---
export const addProjectNote = note => {
  return axios
    .post(`/api/projects/${note.project}/notes`, note)
    .then(resp => resp.data);
};

// --- Project Products Api ---
export const addProduct = product => {
  return axios
    .post(`/api/projects/${product.project}/products`, product)
    .then(resp => resp.data);
};

// --- Project Cost Update Api ---
export const addUpdate = update => {
  return axios
    .post(`/api/projects/${update.project}/updates`, update)
    .then(resp => resp.data);
};

// --- Types API ---
export const getTypes = () => {
  return axios
    .get('/api/types')
    .then(resp => resp.data);
};