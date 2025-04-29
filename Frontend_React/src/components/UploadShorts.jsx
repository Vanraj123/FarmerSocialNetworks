// import React, { useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';
// import Swal from 'sweetalert2';
// import './UploadShorts.css';

// const UploadShorts = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [video, setVideo] = useState(null);
//   const { userId } = useAuth(); // Get the userId from AuthContext

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('userId', userId);
//     formData.append('video', video);

//     // Display a loading SweetAlert
//     Swal.fire({
//       title: 'Uploading...',
//       text: 'Please wait while we upload your short.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       const response = await axios.post('http://localhost:8080/shorts/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 201) {
//         // Display success SweetAlert
//         await Swal.fire({
//           icon: 'success',
//           title: 'Short uploaded successfully',
//           text: 'Your short has been uploaded!',
//           confirmButtonColor: '#4CAF50',
//         });
//       }
//     } catch (error) {
//       console.error('Error uploading short:', error);

//       // Display error SweetAlert
//       Swal.fire({
//         icon: 'error',
//         title: 'Upload Failed',
//         text: 'Error uploading short, please try again.',
//         confirmButtonColor: '#d33',
//       });
//     }
//   };

//   return (
//     <div className="upload-shorts-container">
//       <h2>Upload a Short</h2>
//       <form onSubmit={handleUpload}>
//         <div>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder=" "
//             required
//           />
//           <label htmlFor="title">Title</label>
//         </div>

//         <div>
//           <input
//             type="text"
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder=" "
//             required
//           />
//           <label htmlFor="description">Description</label>
//         </div>

//         <div>
//           <input
//             type="file"
//             id="video"
//             onChange={(e) => setVideo(e.target.files[0])}
//             required
//           />
//           <label htmlFor="video">Video</label>
//         </div>

//         <button type="submit">Upload Short</button>
//       </form>
//     </div>
//   );
// };

// export default UploadShorts;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';
import './UploadShorts.css';
import { useNavigate } from "react-router-dom";

const UploadShorts = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const { userId } = useAuth(); // Get the userId from AuthContext
  const navigate = useNavigate();
  // Generate preview URL when video is selected
  useEffect(() => {
    if (video) {
      const objectUrl = URL.createObjectURL(video);
      setVideoPreviewUrl(objectUrl);
      
      // Free memory when component unmounts or when video changes
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [video]);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('userId', userId);
    formData.append('video', video);

    // Display a loading SweetAlert
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait while we upload your short.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.post('http://localhost:8080/shorts/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        // Reset form after successful upload
        setTitle('');
        setDescription('');
        setVideo(null);
        setVideoPreviewUrl(null);
        
        // Display success SweetAlert
        await Swal.fire({
          icon: 'success',
          title: 'Short uploaded successfully',
          text: 'Your short has been uploaded!',
          confirmButtonColor: '#4CAF50',
        }).then(() => {
          navigate(" http://localhost:3000"); // Redirect to home after the alert
      });
      }
    } catch (error) {
      console.error('Error uploading short:', error);

      // Display error SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: 'Error uploading short, please try again.',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="upload-shorts-container">
      <h2>Upload a Short</h2>
      <form onSubmit={handleUpload}>
        <div>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder=" "
            required
          />
          <label htmlFor="title">Title</label>
        </div>

        <div>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder=" "
            required
          />
          <label htmlFor="description">Description</label>
        </div>

        <div>
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            required
          />
          <label htmlFor="video">Video</label>
        </div>

        {/* Preview section */}
        {videoPreviewUrl && (
          <div className="video-preview-wrapper">
            <h3>Preview</h3>
            <video 
              className="video-preview" 
              src={videoPreviewUrl} 
              controls
              autoPlay={false}
            />
            <div className="video-info">
              <p><strong>File:</strong> {video?.name}</p>
              <p><strong>Size:</strong> {video ? `${(video.size / (1024 * 1024)).toFixed(2)} MB` : '0 MB'}</p>
            </div>
          </div>
        )}

        <button type="submit" disabled={!video}>Upload Short</button>
      </form>
    </div>
  );
};

export default UploadShorts;