import axios from 'axios';

// --- Client API ---
export const getClients = (query) => {
  if (query.search) {
    return axios
      .get(`/api/clients?q=${query.q}&postalCode=${query.postalCode}&city=${query.city}&street=${query.street}&access_token=${query.access_token}`)
      .then(resp => resp.data);
  } else {
    return axios
      .get(`/api/clients?access_token=${query.access_token}`)
      .then(resp => resp.data);
  }
};

export const getClient = query => {
  return axios
    .get(`/api/clients/${query.id}?access_token=${query.access_token}`)
    .then(resp => resp.data);
};

export const addClient = client => {
  return axios
    .post('/api/clients', client)
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const updateClient = (client, id) => {
  return axios
    .post(`/api/clients/${id}`, client)
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const deleteClient = query => {
  return axios
    .delete(`/api/clients/${query.id}?access_token=${query.access_token}`)
    .then(resp => resp.data);
};

// --- Client Notes Api ---
export const addClientNote = note => {
  return axios
    .post(`/api/clients/${note.client}/notes`, note)
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const deleteClientNote = query => {
  return axios
    .delete(`/api/clients/${query.client}/notes/${query.id}?access_token=${query.access_token}`)
    .then(resp => resp.data);
};

// --- Project API ---
export const getProjects = (query) => {
  if (query.search) {
    return axios
      .get(`/api/projects?q=${query.q}&postalCode=${query.postalCode}&city=${query.city}&street=${query.street}&type=${query.type}&status=${query.status}&access_token=${query.access_token}`)
      .then(resp => resp.data);
  } else {
    return axios
    .get(`/api/projects?access_token=${query.access_token}`)
    .then(resp => resp.data);
  }
};

export const getProject = query => {
  return axios
    .get(`/api/projects/${query.id}?access_token=${query.access_token}`)
    .then(resp => resp.data);
};

export const addProject = project => {
  return axios
    .post('/api/projects', project)
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const updateProject = (project, id) => {
  return axios
    .post(`/api/projects/${id}`, project)
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const deleteProject = query => {
  return axios
    .delete(`/api/projects/${query.id}?access_token=${query.access_token}`)
    .then(resp => resp.data);
};

// --- Project Notes Api ---
export const addProjectNote = note => {
  return axios
    .post(`/api/projects/${note.project}/notes`, note)
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const deleteProjectNote = query => {
  return axios
    .delete(`/api/projects/${query.project}/notes/${query.id}?access_token=${query.access_token}`)
    .then(resp => resp.data);
};

// --- Project Products Api ---
export const addProduct = product => {
  return axios
    .post(`/api/projects/${product.project}/products`, product)
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const deleteProduct = query => {
  return axios
    .delete(`/api/projects/${query.project}/products/${query.id}?access_token=${query.access_token}`)
    .then(resp => resp.data);
};

// --- Project Cost Update Api ---
export const addUpdate = update => {
  return axios
    .post(`/api/projects/${update.project}/updates`, update)
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const deleteUpdate = query => {
  return axios
    .delete(`/api/projects/${query.project}/updates/${query.id}?access_token=${query.access_token}`)
    .then(resp => resp.data);
};

// --- Photo API ---
export const addPhoto = photo => {
  let data = new FormData();
  data.append('name', photo.name);
  data.append('description', photo.description);
  data.append('photo', photo.photo);
  data.append('project', photo.project);
  data.append('addedBy', photo.addedBy);
  data.append('access_token', photo.access_token);

  return axios
    .post(`/api/projects/${photo.project}/photos`, data)
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const deletePhoto = query => {
  return axios
    .delete(`/api/projects/${query.project}/photos/${query.id}?access_token=${query.access_token}`)
    .then(resp => resp.data);
};

// --- File API ---
export const addFile = file => {
  let data = new FormData();
  data.append('name', file.name);
  data.append('description', file.description);
  data.append('file', file.file);
  data.append('project', file.project);
  data.append('addedBy', file.addedBy);
  data.append('access_token', file.access_token);

  return axios
    .post(`/api/projects/${file.project}/files`, data)
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const deleteFile = query => {
  return axios
    .delete(`/api/projects/${query.project}/files/${query.id}?access_token=${query.access_token}`)
    .then(resp => resp.data);
};

// --- Types API ---
export const getTypes = query => {
  return axios
    .get(`/api/types?access_token=${query.access_token}`)
    .then(resp => resp.data);
};

export const addType = type => {
  return axios
    .post('/api/types', type)
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const deleteType = type => {
  return axios
    .delete(`/api/types/${type.id}?access_token=${type.access_token}`)
    .then(resp => resp.data)
    .catch(error => error.response);
};

// --- Referrals API ---
export const getReferrals = query => {
  return axios
    .get(`/api/referrals?access_token=${query.access_token}`)
    .then(resp => resp.data);
};

export const addReferral = type => {
  return axios
    .post('/api/referrals', type)
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const deleteReferral = type => {
  return axios
    .delete(`/api/referrals/${type.id}?access_token=${type.access_token}`)
    .then(resp => resp.data)
    .catch(error => error.response);
};


// --- User Authentication API ---
export const isLoggedIn = () => {
  return axios
    .get('/auth/isLoggedIn')
    .then(resp => resp.data);
};

export const login = userCredentials => {
  return axios
    .post('/auth/login', userCredentials)
    .then(resp => resp.data);
};

export const logout = () => {
  return axios
    .get('/auth/logout')
    .then(resp => resp.data);
};

// --- User API ---
export const getUser = query => {
  return axios
    .get(`/api/users/${query.id}?access_token=${query.access_token}`)
    .then(resp => resp.data);
};

export const getUsers = (query) => {
  if (query.search) {
    return axios
      .get(`/api/users?name=${query.name}&email=${query.email}&role=${query.role}&access_token=${query.access_token}`)
      .then(resp => resp.data);
  } else {
    return axios
    .get(`/api/users?access_token=${query.access_token}`)
    .then(resp => resp.data);
  }
};

export const addUser = user => {
  return axios
    .post('/api/users', user)
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const updateUser = (user, id) => {
  return axios
    .post(`/api/users/${id}`, user)
    .then(resp => resp.data)
    .catch(error => error.response);
};

export const deleteUser = query => {
  return axios
    .delete(`/api/users/${query.id}?access_token=${query.access_token}`)
    .then(resp => resp.data)
    .catch(error => error.response);
};

// --- Roles API ---
export const getRoles = query => {
  return axios
    .get(`/api/roles?access_token=${query.access_token}`)
    .then(resp => resp.data);
};

// --- Stats API ---
export const getTotalVolume = query => {
  if (query.search) {
    return axios
      .get(`/stats/api/total?startDate=${query.startDate}&endDate=${query.endDate}&postalCode=${query.postalCode}&access_token=${query.access_token}`)
      .then(resp => resp.data);
  } else {
    return axios
      .get(`/stats/api/total?access_token=${query.access_token}`)
      .then(resp => resp.data);
  }
};

export const getTotalVolumeByType = query => {
  if (query.search) {
    return axios
      .get(`/stats/api/types?startDate=${query.startDate}&endDate=${query.endDate}&postalCode=${query.postalCode}&access_token=${query.access_token}`)
      .then(resp => resp.data);
  } else {
    return axios
      .get(`/stats/api/types?access_token=${query.access_token}`)
      .then(resp => resp.data);
  }
};

export const getTotalVolumeBySalesmen = query => {
  if (query.search) {
    return axios
      .get(`/stats/api/salesmen?startDate=${query.startDate}&endDate=${query.endDate}&postalCode=${query.postalCode}&access_token=${query.access_token}`)
      .then(resp => resp.data);
  } else {
    return axios
      .get(`/stats/api/salesmen?access_token=${query.access_token}`)
      .then(resp => resp.data);
  }
};

export const getTotalVolumeByReferral = query => {
  if (query.search) {
    return axios
      .get(`/stats/api/referrals?startDate=${query.startDate}&endDate=${query.endDate}&postalCode=${query.postalCode}&access_token=${query.access_token}`)
      .then(resp => resp.data);
  } else {
    return axios
      .get(`/stats/api/referrals?access_token=${query.access_token}`)
      .then(resp => resp.data);
  }
};