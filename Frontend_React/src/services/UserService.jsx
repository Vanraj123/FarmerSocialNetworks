import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Change this based on your backend API URL

// Fetch user profile
export const getUserProfile = async (userId) => {
    const response = await axios.get(`${API_URL}/users/${userId}/profile`);
    return response.data; // Return the user profile data
};

// Update user profile
export const updateUserProfile = async (userId, formData) => {
    const response = await axios.put(`${API_URL}/user/${userId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Make sure the server accepts multipart
        },
    });
    return response.data; // Return response from server (optional)
};


