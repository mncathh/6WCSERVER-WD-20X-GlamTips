// frontend/src/utils/api.js

import axios from 'axios';

// Set the base URL to your running backend API
const api = axios.create({
    baseURL: 'http://localhost:3000/api', 
});

export default api;