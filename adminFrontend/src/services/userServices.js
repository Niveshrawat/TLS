import axios from 'axios';

const login = (email, password) => {
  return axios.post('/api/admin/login', { email, password });
};

export default {
  login,
};
