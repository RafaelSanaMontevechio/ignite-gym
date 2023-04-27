import { AppError } from '@utils/AppError';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3333',
});

// API.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    }

    return Promise.reject(error);
  },
);

export { API };
