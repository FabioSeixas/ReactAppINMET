import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apitempo.inmet.gov.br',
});

export default api;
