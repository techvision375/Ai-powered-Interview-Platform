import axios from 'axios';
import { BASE_URL } from './apiPath.js';

// Create a custom Axios instance:
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000, // 80 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

//  What is an Interceptor?
// In Axios, an interceptor is like a middleware that lets you intercept or modify:
// Requests before they are sent to the server
// Responses before they are handled by your app
// A security guard that checks, changes, or logs every request or response before it moves forward.
// adding a request interceptor to include JWT token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token'); // Assuming token is stored in localStorage
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// adding a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      window.location.href = '/'; // Redirect to login page
      console.error('Unauthorized access - redirecting to login');
      // Redirect logic can be added here
    } else if (error.response && error.response.status === 500) {
      // Handle forbidden access
      console.error('server error - please try again later');
    } else if( error.code === 'ECONNABORTED') {
      console.error("Request timed out - please try again later");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;