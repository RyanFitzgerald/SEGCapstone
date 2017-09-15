import axios from 'axios';

// --- Client API ---
export const getClients = () => {
  return axios
    .get('/api/clients')
    .then(resp => resp.data);
};

export const searchClients = query => {
  return axios
    .get(`/api/clients?q=${query.q}&postalCode=${query.postalCode}&city=${query.city}`)
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

export const deleteClient = id => {
  return axios
    .delete(`/api/clients/${id}`)
    .then(resp => resp.data);
}

// --- Types API ---
export const getTypes = () => {
  return axios
    .get('/api/types')
    .then(resp => resp.data);
};