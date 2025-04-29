import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './CropResourceUploadComponent.css';

const MySwal = withReactContent(Swal);

const CropResourceUploadComponent = () => {
    const { role, userId } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('WINTER');

    const handleUpload = async (e) => {
        e.preventDefault();

        // Validate that category is selected
        if (!category) {
            MySwal.fire({
                icon: 'warning',
                title: '⚠️ Missing Category',
                text: 'Please select a category.',
                background: '#fff3cd',
                confirmButtonColor: '#ffc107',
            });
            return;
        }

        try {
            // Make sure the endpoint is correct and includes the correct port if necessary
            await axios.post(`http://localhost:8080/api/crop-resources?userId=${userId}`, {
                title,
                description,
                category,
            });

            MySwal.fire({
                icon: 'success',
                title: '🎉 Upload Successful!',
                text: 'Resource uploaded successfully!',
                background: '#e6ffed',
                confirmButtonColor: '#28a745',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
            });

            setTitle('');
            setDescription('');
            setCategory('WINTER');
        } catch (error) {
            console.error("Upload Error:", error.response || error.message);

            MySwal.fire({
                icon: 'error',
                title: '❌ Upload Failed',
                text: 'Error uploading resource. Please try again.',
                background: '#f8d7da',
                confirmButtonColor: '#dc3545',
            });
        }
    };

    // Ensure only agronomists can upload
    if (role !== 'agronomist') {
        return (
            <MySwal
                icon="warning"
                title="⚠️ Access Denied"
                text="Only agronomists can upload resources."
                background="#fff3cd"
                confirmButtonColor="#ffc107"
                showConfirmButton={true}
                didClose={() => window.location.href = '/'} // Redirect on close
            />
        );
    }

    return (
        <div className="cropresource-upload-container">
            <h2>Upload Crop Resource</h2>
            <form onSubmit={handleUpload}>
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder=" "
                        required
                    />
                    <label htmlFor="title">Title</label>
                </div>
                <div>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder=" "
                        required
                    />
                    <label htmlFor="description">Description</label>
                </div>
                <div>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="WINTER">Winter</option>
                        <option value="MONSOON">Monsoon</option>
                        <option value="SUMMER">Summer</option>
                    </select>
                    <label htmlFor="category">Category</label>
                </div>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default CropResourceUploadComponent;
