import axios from 'axios';

const apiURLs = {
  development: 'https://controlegadoapp.cyclic.app',
  production: 'https://controlegadoapp.cyclic.app',
};

const api = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });
api.interceptors.request.use((config) => {
  const loggedInUserJson = localStorage.getItem('loggedInUser');
  const parsedLoggedInUser = JSON.parse(loggedInUserJson || '""');
  if (parsedLoggedInUser.token) {
    config.headers = { Authorization: `Bearer ${parsedLoggedInUser.token}` };
  }
  return config;
});
export default api;
