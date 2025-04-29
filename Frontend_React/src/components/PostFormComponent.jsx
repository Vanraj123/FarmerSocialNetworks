import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeComponent.css';
import './PostFormComponent.css';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; 
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

const PostFormComponent = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/login');
        }
    }, [isLoading, user, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content || !image) {
            MySwal.fire({
                icon: 'warning',
                title: '⚠️ Missing Fields',
                text: 'All fields are required. Please fill out the form completely.',
                background: '#fefefe',
                confirmButtonColor: '#2563eb',
                backdrop: `
                    rgba(0,0,0,0.4)
                    url("https://i.giphy.com/media/j2pOGeGYKe2xCCKwfi/giphy.webp")
                    left top
                    no-repeat
                `,
            });
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('file', image);

        if (user && user.id) {
            formData.append('user_id', user.id);
        } else {
            MySwal.fire({
                icon: 'error',
                title: '🚫 Authentication Error',
                text: 'User is not logged in or user ID is unavailable.',
                confirmButtonText: 'Login',
                background: '#f8d7da',
                confirmButtonColor: '#d9534f',
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/posts/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            MySwal.fire({
                icon: 'success',
                title: '🎉 Post Uploaded!',
                text: 'Your post has been uploaded successfully!',
                showConfirmButton: false,
                timer: 2000,
                background: '#e3fcec',
                timerProgressBar: true,
            });

            setTitle('');
            setContent('');
            setImage(null);
            setImagePreview(null);
        } catch (err) {
            console.error('Error uploading the post:', err);
            MySwal.fire({
                icon: 'error',
                title: '❌ Upload Failed',
                text: 'Failed to upload the post. Please try again later.',
                background: '#fef2f2',
                confirmButtonColor: '#dc2626',
            });
        }
    };

    return (
        <div className="postform-container">
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder=""
                        required
                    />
                    <label htmlFor="title">Title</label>
                </div>
                <div className="form-group">
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder=" "
                        required
                    ></textarea>
                    <label htmlFor="content">Content</label>
                </div>
                <div className="form-group">
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    <label htmlFor="image">Upload Image</label>
                    {imagePreview && (
                        <div className="postform-image-preview">
                            <img src={imagePreview} alt="Preview" />
                        </div>
                    )}
                </div>
                <button type="submit" className="submit-btn">
                    Submit Post
                </button>
            </form>
        </div>
    );
};

export default PostFormComponent;
