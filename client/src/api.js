import axios from 'axios';

// Get all clients
export const getClients = () => {
  return axios
    .get('/clients')
    .then(resp => resp.data);
};