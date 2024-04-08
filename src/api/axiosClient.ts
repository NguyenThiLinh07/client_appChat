import axios from 'axios';
import { getTokenFromCookie } from '../helpers/cookies';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL_CLIENT, // replace with your API base URL
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
  timeout: 5000, // request timeout
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // For example, add authorization header
    const token = getTokenFromCookie(); // replace with your function to get token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  },
);

export default axiosInstance;
