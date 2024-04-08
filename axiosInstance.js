//axiosInstance.js
import axios from 'axios';

const baseURL = 'http://192.168.48.213:8004';

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
