// import axios from 'axios';

// const BASE_URL = 'http://localhost:8080/api/posts';
// const USER_BASE_URL = 'http://localhost:8080/api/users';

// class PostService {
//     // Fetch all posts
//     getAllPosts() {
//         return axios.get(BASE_URL);
//     }

//     // Upload a new post
//     createPost(postData) {
//         return axios.post(`${BASE_URL}/upload`, postData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//     }

//     // Get a specific post by ID
//     getPostById(postId) {
//         return axios.get(`${BASE_URL}/${postId}`);
//     }

//     // Get the image of a post by ID
//     getPostImage(postId) {
//         return axios.get(`${BASE_URL}/${postId}/image`);
//     }

//     // Fetch user details by userId (NEW METHOD)
//     getUserById(userId) {
//         return axios.get(`${USER_BASE_URL}/${userId}`);
//     }

//     deletePost(postId) {
//         return axios.delete(`${BASE_URL}/${postId}`);
//     }
//     toggleLike(postId, userId) {
//         return axios.post(`${BASE_URL}/${postId}/like`, null, {
//             params: { userId },
//         }).then(response => response.data);  // Ensure the response includes updated post data
//     }
    
// }

// export default new PostService();
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/posts';
const USER_BASE_URL = 'http://localhost:8080/api/users';

class PostService {
    // Fetch all posts
    getAllPosts() {
        return axios.get(BASE_URL);
    }

    // Upload a new post
    createPost(postData) {
        return axios.post(`${BASE_URL}/upload`, postData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    // Get a specific post by ID
    getPostById(postId) {
        return axios.get(`${BASE_URL}/${postId}`);
    }

    // Get the image of a post by ID
    getPostImage(postId) {
        return axios.get(`${BASE_URL}/${postId}/image`);
    }

    // Fetch user details by userId
    getUserById(userId) {
        return axios.get(`${USER_BASE_URL}/${userId}`);
    }

    // Delete a post by ID
    deletePost(postId) {
        return axios.delete(`${BASE_URL}/${postId}`);
    }

    // Toggle like status for a post
    toggleLike(postId, userId) {
        return axios.post(`${BASE_URL}/${postId}/like`, null, {
            params: { userId },
        });
    }

    // Check if a post is liked by a specific user
    isPostLikedByUser(postId, userId) {
        return axios.get(`${BASE_URL}/${postId}/isLiked`, {
            params: { userId },
        });
    }
}

export default new PostService();
