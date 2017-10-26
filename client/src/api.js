import axios from 'axios';

// --- Client API ---
export const getClients = (query) => {
  if (query) {
    return axios
      .get(`/api/clients?q=${query.q}&postalCode=${query.postalCode}&city=${query.city}&street=${query.street}`)
      .then(resp => resp.data);
  } else {
    return axios
      .get('/api/clients')
      .then(resp => resp.data);
  }
};

export const getClient = id => {
  return axios
    .get(`/api/clients/${id}`)
    .then(resp => resp.data);
};

export const addClient = client => {
  return axios
    .post('/api/clients', client)
    .then(resp => resp.data)
    .catch(error => error.response);
}

export const updateClient = (client, id) => {
  return axios
    .post(`/api/clients/${id}`, client)
    .then(resp => resp.data)
    .catch(error => error.response);
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
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const deleteClientNote = note => {
  return axios
    .delete(`/api/clients/${note.client}/notes/${note.id}`)
    .then(resp => resp.data);
}

// --- Project API ---
export const getProjects = (query) => {
  if (query) {
    return axios
      .get(`/api/projects?q=${query.q}&postalCode=${query.postalCode}&city=${query.city}&street=${query.street}&type=${query.type}&status=${query.status}`)
      .then(resp => resp.data);
  } else {
    return axios
    .get('/api/projects')
    .then(resp => resp.data);
  }
};

export const getProject = id => {
  return axios
    .get(`/api/projects/${id}`)
    .then(resp => resp.data);
};

export const addProject = project => {
  return axios
    .post('/api/projects', project)
    .then(resp => resp.data)
    .catch(error => error.response);
}

export const updateProject = (project, id) => {
  return axios
    .post(`/api/projects/${id}`, project)
    .then(resp => resp.data)
    .catch(error => error.response);
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
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const deleteProjectNote = note => {
  return axios
    .delete(`/api/projects/${note.project}/notes/${note.id}`)
    .then(resp => resp.data);
}

// --- Project Products Api ---
export const addProduct = product => {
  return axios
    .post(`/api/projects/${product.project}/products`, product)
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const deleteProduct = product => {
  return axios
    .delete(`/api/projects/${product.project}/products/${product.id}`)
    .then(resp => resp.data);
}

// --- Project Cost Update Api ---
export const addUpdate = update => {
  return axios
    .post(`/api/projects/${update.project}/updates`, update)
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const deleteUpdate = update => {
  return axios
    .delete(`/api/projects/${update.project}/updates/${update.id}`)
    .then(resp => resp.data);
}

// --- Photo API ---
export const addPhoto = photo => {
  let data = new FormData();
  data.append('name', photo.name);
  data.append('description', photo.description);
  data.append('photo', photo.photo);
  data.append('project', photo.project);

  return axios
    .post(`/api/projects/${photo.project}/photos`, data)
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const deletePhoto = photo => {
  return axios
    .delete(`/api/projects/${photo.project}/photos/${photo.id}`)
    .then(resp => resp.data);
}

// --- File API ---
export const addFile = file => {
  let data = new FormData();
  data.append('name', file.name);
  data.append('description', file.description);
  data.append('file', file.file);
  data.append('project', file.project);

  return axios
    .post(`/api/projects/${file.project}/files`, data)
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const deleteFile = file => {
  return axios
    .delete(`/api/projects/${file.project}/files/${file.id}`)
    .then(resp => resp.data);
}

// --- Types API ---
export const getTypes = () => {
  return axios
    .get('/api/types')
    .then(resp => resp.data);
};