import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:44350/api/',
  withCredentials: false
});

export default instance;
