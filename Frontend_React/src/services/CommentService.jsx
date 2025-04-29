// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api'; // Replace with your backend API URL

// const CommentService = {
//     // Fetch all comments for a specific post
//     getCommentsByPostId: async (postId) => {
//         try {
//             const response = await axios.get(`${API_URL}/comments/${postId}`);
//             return response.data;
//         } catch (error) {
//             console.error('Error fetching comments:', error);
//             throw error;
//         }
//     },

//     // Add a new comment to a post
//     addComment: async (postId, userId, content) => {
//         console.log(content);
//         try {
//             const response = await axios.post(`${API_URL}/comments/${postId}`, {
//                 userId,
//                 content,
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
            
//             return response.data;
//         } catch (error) {
//             console.error('Error adding comment:', error);
//             throw error;
//         }
//     },

//     // Delete a comment
//     deleteComment: async (commentId) => {
//         try {
//             const response = await axios.delete(`${API_URL}/comments/${commentId}`);
//             return response;
//         } catch (error) {
//             console.error('Error deleting comment:', error);
//             throw error;
//         }
//     },
// };

// export default CommentService;

// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api'; // Replace with your backend API URL

// const CommentService = {
//     // Fetch all comments for a specific post
//     getCommentsByPostId: async (postId) => {
//         try {
//             const response = await axios.get(`${API_URL}/comments/${postId}`);
//             return response;
//         } catch (error) {
//             console.error('Error fetching comments:', error);
//             throw error;
//         }
//     },

//     // Add a new comment to a post
//     addComment: async (postId, userId, content) => {
//         console.log(content);
//         try {
//             const response = await axios.post(`${API_URL}/comments/${postId}`, {
//                 userId,
//                 content,
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
            
//             return response.data;
//         } catch (error) {
//             console.error('Error adding comment:', error);
//             throw error;
//         }
//     },

//     // Delete a comment
//     deleteComment: async (commentId) => {
//         try {
//             const response = await axios.delete(`${API_URL}/comments/${commentId}`);
//             return response;
//         } catch (error) {
//             console.error('Error deleting comment:', error);
//             throw error;
//         }
//     },
// };


// export default CommentService;

import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Replace with your backend API URL

const CommentService = {
    // Fetch all comments for a specific post
    getCommentsByPostId: async (postId) => {
        try {
            const response = await axios.get(`${API_URL}/comments/${postId}`);
            return response;
        } catch (error) {
            console.error('Error fetching comments:', error);
            throw error;
        }
    },

    // Add a new comment to a post
    addComment: async (postId, userId, content) => {
        console.log(content);
        try {
            const response = await axios.post(`${API_URL}/comments/${postId}`, {
                userId,
                content,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            return response.data;
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    },

    // Delete a comment
    deleteComment: async (commentId) => {
        try {
            const response = await axios.delete(`${API_URL}/comments/${commentId}`);
            return response;
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    },
};


export default CommentService;