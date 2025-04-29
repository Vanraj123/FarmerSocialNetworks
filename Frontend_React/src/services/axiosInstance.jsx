import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:5050', 
//     headers: {
//         'Content-Type': 'multipart/form-data',
//     },
// });

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Base URL for your API
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;

