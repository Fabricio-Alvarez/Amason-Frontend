import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://amason-backend-production.up.railway.app:8080/api', 
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;