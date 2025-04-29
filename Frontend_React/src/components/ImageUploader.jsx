// import React, { useState } from 'react';
// import axiosInstance from '../services/axiosInstance';

// const ImageUploader = () => {
//   const [file, setFile] = useState(null);
//   const [prediction, setPrediction] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handlePredict = async () => {
//     if (!file) {
//       alert('Please upload an image first.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axiosInstance.post('/predict', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setPrediction(response.data);
//     } catch (error) {
//       console.error('Error predicting the image', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Crop Disease Predictor</h1>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handlePredict} disabled={!file}>Predict</button>

//       {prediction && (
//         <div>
//           <h2>Predicted Class: {prediction.predicted_class}</h2>
//           <ul>
//             {Object.entries(prediction.class_probabilities).map(([label, prob]) => (
//               <li key={label}>{label}: {(prob * 100).toFixed(2)}%</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageUploader;


// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../services/axiosInstance';
// import './ImageUploader.css'; // Import the CSS file

// const ImageUploader = () => {
//   const [file, setFile] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   // This effect creates an image preview whenever the file changes
//   useEffect(() => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setImagePreview(null);
//     }
//   }, [file]);

//   const handlePredict = async () => {
//     if (!file) {
//       alert('Please upload an image first.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axiosInstance.post('/predict', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setPrediction(response.data);
//     } catch (error) {
//       console.error('Error predicting the image', error);
//     }
//   };

//   return (
//     <div className="predictor-container">
//       <h1 className="predictor-title">Crop Disease Predictor</h1>
//       <input 
//         type="file" 
//         onChange={handleFileChange} 
//         className="file-input"
//         accept="image/*"
//       />
      
//       {file && <div className="file-name">Selected: {file.name}</div>}
      
//       {/* Image Preview Section */}
//       <div className="image-preview-section">
//         <span className="image-preview-label">Image Preview:</span>
//         {imagePreview ? (
//           <img 
//             src={imagePreview} 
//             alt="Preview" 
//             className="image-preview" 
//           />
//         ) : (
//           <span className="no-preview">No image selected</span>
//         )}
//       </div>
      
//       <button 
//         onClick={handlePredict} 
//         disabled={!file}
//         className="predict-button"
//       >
//         Predict
//       </button>

//       {prediction && (
//         <div className="results-container">
//           <h2 className="results-title">Predicted Class: {prediction.predicted_class}</h2>
//           <ul className="probability-list">
//             {Object.entries(prediction.class_probabilities).map(([label, prob]) => (
//               <li key={label} className="probability-item">
//                 <span className="probability-label">{label}:</span> 
//                 <span className="probability-value">{(prob * 100).toFixed(2)}%</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageUploader;

// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../services/axiosInstance';
// import './ImageUploader.css'; // Import the CSS file

// const ImageUploader = () => {
//   const [file, setFile] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   // Create image preview
//   useEffect(() => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setImagePreview(null);
//     }
//   }, [file]);

//   const handlePredict = async () => {
//     if (!file) {
//       alert('Please upload an image first.');
//       return;
//     }

//     setIsLoading(true);
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axiosInstance.post('/predict', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setPrediction(response.data);
//     } catch (error) {
//       console.error('Error predicting the image', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="predictor-container">
//       <div className="header-section">
//         <h1 className="predictor-title">Crop Disease Predictor</h1>
//         <p className="predictor-subtitle">Upload a photo of your crop to identify diseases</p>
//       </div>
      
//       <div className="content-wrapper">
//         <div className="upload-container">
//           <h2 className="section-title">Upload Image</h2>
          
//           <div className="file-input-container">
//             <input 
//               type="file" 
//               id="file-upload"
//               onChange={handleFileChange} 
//               className="file-input"
//               accept="image/*"
//             />
//             <label htmlFor="file-upload" className="file-input-label">
//               <div className="upload-icon">
//                 <svg viewBox="0 0 24 24">
//                   <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
//                 </svg>
//               </div>
//               <span className="upload-text">{file ? 'Change image' : 'Choose an image'}</span>
//               <span className="upload-hint">or drag and drop it here</span>
//             </label>
//           </div>
          
//           {file && <div className="file-name">{file.name}</div>}
          
//           <div className="image-preview-section">
//             <span className="image-preview-label">Image Preview</span>
//             <div className="image-preview-container">
//               {imagePreview ? (
//                 <img 
//                   src={imagePreview} 
//                   alt="Preview" 
//                   className="image-preview" 
//                 />
//               ) : (
//                 <span className="no-preview">No image selected</span>
//               )}
//             </div>
//           </div>
          
//           <div className="button-container">
//             <button 
//               onClick={handlePredict} 
//               disabled={!file || isLoading}
//               className={`predict-button ${isLoading ? 'is-loading' : ''}`}
//             >
//               {isLoading ? 'Analyzing...' : 'Predict Disease'}
//             </button>
//           </div>
//         </div>

//         {prediction && (
//           <div className="results-container">
//             <h2 className="results-title">Analysis Results</h2>
//             <div className="predicted-class">
//               <strong>Detected Disease:</strong> {prediction.predicted_class}
//             </div>
            
//             <ul className="probability-list">
//               {Object.entries(prediction.class_probabilities)
//                 .sort((a, b) => b[1] - a[1])
//                 .map(([label, prob]) => (
//                 <li key={label} className="probability-item">
//                   <span className="probability-label">{label}</span>
//                   <div className="probability-bar-container">
//                     <div 
//                       className="probability-bar" 
//                       style={{ width: `${prob * 100}%` }}
//                     ></div>
//                   </div>
//                   <span className="probability-value">{(prob * 100).toFixed(1)}%</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageUploader;

// import React, { useState } from 'react';
// import axiosInstance from '../services/axiosInstance';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './ImageUploader.css'; // Optional: Custom CSS for extra flair

// const ImageUploader = () => {
//   const [file, setFile] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);

//     if (selectedFile) {
//       setPreviewUrl(URL.createObjectURL(selectedFile));
//     } else {
//       setPreviewUrl(null);
//     }
//   };

//   const handlePredict = async () => {
//     if (!file) {
//       alert('Please upload an image first.');
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axiosInstance.post('/predict', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setPrediction(response.data);
//     } catch (error) {
//       console.error('Error predicting the image', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-green-100 to-green-300 min-vh-100 d-flex align-items-center justify-content-center">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-8 col-lg-6">
//             <div className="card shadow-lg rounded-3 border-0">
//               <div className="card-body p-5">
//                 <h1 className="text-center mb-4 display-5 fw-bold text-success">
//                   Crop Disease Predictor
//                 </h1>

//                 <div className="mb-4">
//                   <input
//                     type="file"
//                     onChange={handleFileChange}
//                     className="form-control form-control-lg"
//                   />
//                 </div>

//                 {previewUrl && (
//                   <div className="mb-4 text-center">
//                     <img
//                       src={previewUrl}
//                       alt="Image Preview"
//                       className="img-fluid rounded"
//                       style={{ maxHeight: '200px' }}
//                     />
//                   </div>
//                 )}

//                 <div className="d-grid gap-2">
//                   <button
//                     onClick={handlePredict}
//                     disabled={!file || loading}
//                     className={`btn btn-lg ${
//                       file && !loading ? 'btn-success' : 'btn-outline-secondary'
//                     }`}
//                   >
//                     {loading ? (
//                       <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
//                     ) : (
//                       'Predict'
//                     )}
//                   </button>
//                 </div>

//                 {prediction && (
//                   <div className="mt-5">
//                     <h2 className="mb-3 text-center text-muted">
//                       Predicted Class: <span className="fw-bold text-success">{prediction.predicted_class}</span>
//                     </h2>
//                     <ul className="list-group list-group-flush">
//                       {Object.entries(prediction.class_probabilities).map(
//                         ([label, prob]) => (
//                           <li
//                             key={label}
//                             className="list-group-item d-flex justify-content-between align-items-center"
//                           >
//                             <span className="fw-medium">{label}</span>
//                             <span className="badge bg-success rounded-pill px-3 py-2">
//                               {(prob * 100).toFixed(2)}%
//                             </span>
//                           </li>
//                         )
//                       )}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageUploader;

// import React, { useState } from 'react';
// import axiosInstanceImage from '../services/axiosInstanceImage'; // Import the image-specific axios instance
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './ImageUploader.css';

// const ImageUploader = () => {
//     const [file, setFile] = useState(null);
//     const [prediction, setPrediction] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [previewUrl, setPreviewUrl] = useState(null);

//     const handleFileChange = (event) => {
//         const selectedFile = event.target.files[0];
//         setFile(selectedFile);

//         if (selectedFile) {
//             setPreviewUrl(URL.createObjectURL(selectedFile));
//         } else {
//             setPreviewUrl(null);
//         }
//     };

//     const handlePredict = async () => {
//         if (!file) {
//             alert('Please upload an image first.');
//             return;
//         }

//         setLoading(true);
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axiosInstanceImage.post('/predict', formData, { // Use axiosInstanceImage
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             setPrediction(response.data);
//         } catch (error) {
//             console.error('Error predicting the image', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="bg-gradient-to-br from-green-100 to-green-300 min-vh-100 d-flex align-items-center justify-content-center">
//             <div className="container">
//                 <div className="row justify-content-center">
//                     <div className="col-md-8 col-lg-6">
//                         <div className="card shadow-lg rounded-3 border-0">
//                             <div className="card-body p-5">
//                                 <h1 className="text-center mb-4 display-5 fw-bold text-success">
//                                     Crop Disease Predictor
//                                 </h1>

//                                 <div className="mb-4">
//                                     <input
//                                         type="file"
//                                         onChange={handleFileChange}
//                                         className="form-control form-control-lg"
//                                     />
//                                 </div>

//                                 {previewUrl && (
//                                     <div className="mb-4 text-center">
//                                         <img
//                                             src={previewUrl}
//                                             alt="Image Preview"
//                                             className="img-fluid rounded"
//                                             style={{ maxHeight: '200px' }}
//                                         />
//                                     </div>
//                                 )}

//                                 <div className="d-grid gap-2">
//                                     <button
//                                         onClick={handlePredict}
//                                         disabled={!file || loading}
//                                         className={`btn btn-lg ${file && !loading ? 'btn-success' : 'btn-outline-secondary'}`}
//                                     >
//                                         {loading ? (
//                                             <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
//                                         ) : (
//                                             'Predict'
//                                         )}
//                                     </button>
//                                 </div>

//                                 {prediction && (
//                                     <div className="mt-5">
//                                         <h2 className="mb-3 text-center text-muted">
//                                             Predicted Class: <span className="fw-bold text-success">{prediction.predicted_class}</span>
//                                         </h2>
//                                         <ul className="list-group list-group-flush">
//                                             {Object.entries(prediction.class_probabilities).map(([label, prob]) => (
//                                                 <li
//                                                     key={label}
//                                                     className="list-group-item d-flex justify-content-between align-items-center"
//                                                 >
//                                                     <span className="fw-medium">{label}</span>
//                                                     <span className="badge bg-success rounded-pill px-3 py-2">
//                                                         {(prob * 100).toFixed(2)}%
//                                                     </span>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ImageUploader;



import React, { useState } from 'react';
import axiosInstanceImage from '../services/axiosInstanceImage'; // Import the image-specific axios instance
import 'bootstrap/dist/css/bootstrap.min.css';
import './ImageUploader.css';

const ImageUploader = () => {
    const [file, setFile] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    const classLabels = [
        "Brownspot",
        "Common Rust",
        "Gray Leaf Spot",
        "Healthy Wheat",
        "Healthy Cotton",
        "Leaf Curl",
        "Rice Blast",
        "Wheat Brown Leaf",
        "Red Cotton Bug",
        "Thrips on Cotton"
    ];

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            setPreviewUrl(URL.createObjectURL(selectedFile));
        } else {
            setPreviewUrl(null);
        }
    };

    const handlePredict = async () => {
        if (!file) {
            alert('Please upload an image first.');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axiosInstanceImage.post('/predict', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setPrediction(response.data);
        } catch (error) {
            console.error('Error predicting the image', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-green-100 to-green-300 min-vh-100 d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg rounded-3 border-0">
                            <div className="card-body p-5">
                                <h1 className="text-center mb-4 display-5 fw-bold text-success">
                                    Crop Disease Predictor
                                </h1>

                                <div className="mb-4">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="form-control form-control-lg"
                                    />
                                </div>

                                {previewUrl && (
                                    <div className="mb-4 text-center">
                                        <img
                                            src={previewUrl}
                                            alt="Image Preview"
                                            className="img-fluid rounded"
                                            style={{ maxHeight: '200px' }}
                                        />
                                    </div>
                                )}

                                <div className="d-grid gap-2">
                                    <button
                                        onClick={handlePredict}
                                        disabled={!file || loading}
                                        className={`btn btn-lg ${file && !loading ? 'btn-success' : 'btn-outline-secondary'}`}
                                    >
                                        {loading ? (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        ) : (
                                            'Predict'
                                        )}
                                    </button>
                                </div>

                                {prediction && (
                                    <div className="mt-5">
                                        <h2 className="mb-3 text-center text-muted">
                                            Predicted Class: <span className="fw-bold text-success">{prediction.predicted_class}</span>
                                        </h2>
                                        <ul className="list-group list-group-flush">
                                            {prediction.class_probabilities.map((prob, index) => (
                                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                    <span className="fw-medium">{classLabels[index]}</span>
                                                    <span className="badge bg-success rounded-pill px-3 py-2">
                                                        {(prob * 100).toFixed(2)}%
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;