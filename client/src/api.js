import axios from 'axios';

// --- Client API ---
export const getClients = () => {
  return axios
    .get('/api/clients')
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

// --- Types API ---
export const getTypes = () => {
  return axios
    .get('/api/types')
    .then(resp => resp.data);
};