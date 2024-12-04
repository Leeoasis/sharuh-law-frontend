import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3001', // Ensure this URL is correct
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;