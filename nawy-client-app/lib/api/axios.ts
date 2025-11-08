import axios from 'axios';
import { toast } from 'react-hot-toast';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + '/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Global response interceptor
api.interceptors.response.use(
  (response) => response, // just return response if OK
  (error) => {
    let message = 'An unknown error occurred';
console.log('API Error:', error);
    if (error.response) {
      // Server returned an error
      message = error.response.data?.message || message;
    } else if (error.message) {
      message = error.message;
    }

    // Show toast notification
    toast.error(message);

    return Promise.reject(error); // still reject so calling code can handle if needed
  }
);

export default api;
