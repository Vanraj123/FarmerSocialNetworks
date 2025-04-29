// import React, { useState } from 'react';
// import { register } from '../services/AuthService';
// // import HeaderComponent from './HeaderComponent';
// import './HeaderComponent.css';
// import './RegisterComponent.css';
// // import FooterComponent from './FooterComponent';

// const RegistrationComponent = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('farmer');
//     const [location, setLocation] = useState('');
//     const [contactInfo, setContactInfo] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Create user data object with current date
//         const userData = {
//             name,
//             email,
//             password,
//             role,
//             location,
//             contactInfo,
//             dateOfJoining: new Date().toISOString(), // Automatically set current date
//         };

//         try {
//             const data = await register(userData);
//             setSuccess('Registration successful!');
//             setError('');
//             console.log('User registered:', data);
//             // Optionally, clear the form
//             setName('');
//             setEmail('');
//             setPassword('');
//             setRole('farmer');
//             setLocation('');
//             setContactInfo('');
//         } catch (err) {
//             setError('Registration failed. Please try again.');
//             setSuccess('');
//             console.error('Error during registration:', err);
//         }
//     };

//     return (
//         <div>
//             {/* <HeaderComponent /> */}
//             <div className="registration-container">
//             <h2>Register</h2>
//             {error && <p className="error">{error}</p>}
//             {success && <p className="success">{success}</p>}
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <input
//                         type="text"
//                         id="name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder=" "
//                         required
//                     />
//                     <label htmlFor="name">Name</label>
//                 </div>
//                 <div className="form-group">
//                     <input
//                         type="email"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder=" "
//                         required
//                     />
//                     <label htmlFor="email">Email</label>
//                 </div>
//                 <div className="form-group">
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder=" "
//                         required
//                     />
//                     <label htmlFor="password">Password</label>
//                 </div>
//                 <div className="form-group">
//                     <select
//                         id="role"
//                         value={role}
//                         onChange={(e) => setRole(e.target.value)}
//                         placeholder=" "
//                         required
//                     >
//                         <option value="farmer">Farmer</option>
//                         <option value="admin">Admin</option>
//                         <option value="agronomist">Agronomist</option>
//                     </select>
//                     <label htmlFor="role">Role</label>
//                 </div>
//                 <div className="form-group">
//                     <input
//                         type="text"
//                         id="location"
//                         value={location}
//                         onChange={(e) => setLocation(e.target.value)}
//                         placeholder=" "
//                         required
//                     />
//                     <label htmlFor="location">Location</label>
//                 </div>
//                 <div className="form-group">
//                     <input
//                         type="text"
//                         id="contactInfo"
//                         value={contactInfo}
//                         onChange={(e) => setContactInfo(e.target.value)}
//                         placeholder=" "
//                         required
//                     />
//                     <label htmlFor="contactInfo">Contact Info</label>
//                 </div>
//                 <button type="submit">Register</button>
//             </form>
//         </div>
//         {/* <FooterComponent /> */}
//         </div>
//     );
// };

// export default RegistrationComponent;


// import React, { useState } from 'react';
// import { register } from '../services/AuthService';
// import './HeaderComponent.css';
// import './RegisterComponent.css';

// const RegistrationComponent = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('farmer');
//     const [location, setLocation] = useState('');
//     const [contactInfo, setContactInfo] = useState('');
//     const [profileImage, setProfileImage] = useState(null);  // Profile image state
//     const [imagePreview, setImagePreview] = useState(null);  // Image preview state
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const userData = {
//             name,
//             email,
//             password,
//             role,
//             location,
//             contactInfo,
//             dateOfJoining: new Date().toISOString(),
//             profileImage,  // Add profile image to the data
//         };

//         try {
//             const data = await register(userData);
//             setSuccess('Registration successful!');
//             setError('');
//             console.log('User registered:', data);
//             setName('');
//             setEmail('');
//             setPassword('');
//             setRole('farmer');
//             setLocation('');
//             setContactInfo('');
//             setProfileImage(null);  // Clear profile image
//             setImagePreview(null);  // Clear image preview
//         } catch (err) {
//             setError('Registration failed. Please try again.');
//             setSuccess('');
//             console.error('Error during registration:', err);
//         }
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setProfileImage(file);
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setImagePreview(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     return (
//         <div>
//             <div className="registration-container">
//                 <h2>Register</h2>
//                 {error && <p className="error">{error}</p>}
//                 {success && <p className="success">{success}</p>}
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             id="name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             placeholder=" "
//                             required
//                         />
//                         <label htmlFor="name">Name</label>
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder=" "
//                             required
//                         />
//                         <label htmlFor="email">Email</label>
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder=" "
//                             required
//                         />
//                         <label htmlFor="password">Password</label>
//                     </div>
//                     <div className="form-group">
//                         <select
//                             id="role"
//                             value={role}
//                             onChange={(e) => setRole(e.target.value)}
//                             placeholder=" "
//                             required
//                         >
//                             <option value="farmer">Farmer</option>
//                             <option value="admin">Admin</option>
//                             <option value="agronomist">Agronomist</option>
//                         </select>
//                         <label htmlFor="role">Role</label>
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             id="location"
//                             value={location}
//                             onChange={(e) => setLocation(e.target.value)}
//                             placeholder=" "
//                             required
//                         />
//                         <label htmlFor="location">Location</label>
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             id="contactInfo"
//                             value={contactInfo}
//                             onChange={(e) => setContactInfo(e.target.value)}
//                             placeholder=" "
//                             required
//                         />
//                         <label htmlFor="contactInfo">Contact Info</label>
//                     </div>
//                     {/* Profile Image Upload */}
//                     <div className="form-group">
//                         <input
//                             type="file"
//                             id="profileImage"
//                             accept="image/*"
//                             onChange={handleImageChange}
//                         />
//                         {imagePreview && (
//                             <div className="image-preview">
//                                 <img src={imagePreview} alt="Profile Preview" className="preview-image" />
//                             </div>
//                         )}
//                         <label htmlFor="profileImage">Profile Image</label>
//                     </div>

//                     <button type="submit">Register</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default RegistrationComponent;


// import React, { useState } from 'react';
// import { register } from '../services/AuthService';
// import Swal from 'sweetalert2';
// import './HeaderComponent.css';
// import './RegisterComponent.css';

// const RegistrationComponent = () => {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('farmer');
//     const [location, setLocation] = useState('');
//     const [contactInfo, setContactInfo] = useState('');
//     const [profileImage, setProfileImage] = useState(null);  // Profile image state
//     const [imagePreview, setImagePreview] = useState(null);  // Image preview state

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const userData = {
//             name,
//             email,
//             password,
//             role,
//             location,
//             contactInfo,
//             dateOfJoining: new Date().toISOString(),
//             profileImage,  // Add profile image to the data
//         };

//         try {
//             const data = await register(userData);
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Registration successful!',
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//             console.log('User registered:', data);
//             setName('');
//             setEmail('');
//             setPassword('');
//             setRole('farmer');
//             setLocation('');
//             setContactInfo('');
//             setProfileImage(null);  // Clear profile image
//             setImagePreview(null);  // Clear image preview
//         } catch (err) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Registration failed. Please try again.',
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//             console.error('Error during registration:', err);
//         }
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setProfileImage(file);
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setImagePreview(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     return (
//         <div>
//             <div className="registration-container">
//                 <h2>Register</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             id="name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             placeholder=" "
//                             required
//                         />
//                         <label htmlFor="name">Name</label>
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             placeholder=" "
//                             required
//                         />
//                         <label htmlFor="email">Email</label>
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             placeholder=" "
//                             required
//                         />
//                         <label htmlFor="password">Password</label>
//                     </div>
//                     <div className="form-group">
//                         <select
//                             id="role"
//                             value={role}
//                             onChange={(e) => setRole(e.target.value)}
//                             placeholder=" "
//                             required
//                         >
//                             <option value="farmer">Farmer</option>
//                             <option value="admin">Admin</option>
//                             <option value="agronomist">Agronomist</option>
//                         </select>
//                         <label htmlFor="role">Role</label>
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             id="location"
//                             value={location}
//                             onChange={(e) => setLocation(e.target.value)}
//                             placeholder=" "
//                             required
//                         />
//                         <label htmlFor="location">Location</label>
//                     </div>
//                     <div className="form-group">
//                         <input
//                             type="text"
//                             id="contactInfo"
//                             value={contactInfo}
//                             onChange={(e) => setContactInfo(e.target.value)}
//                             placeholder=" "
//                             required
//                         />
//                         <label htmlFor="contactInfo">Contact Info</label>
//                     </div>
//                     {/* Profile Image Upload */}
//                     <div className="form-group">
//                         <input
//                             type="file"
//                             id="profileImage"
//                             accept="image/*"
//                             onChange={handleImageChange}
//                         />
//                         {imagePreview && (
//                             <div className="image-preview">
//                                 <img src={imagePreview} alt="Profile Preview" className="preview-image" />
//                             </div>
//                         )}
//                         <label htmlFor="profileImage">Profile Image</label>
//                     </div>

//                     <button type="submit">Register</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default RegistrationComponent;

import React, { useState } from 'react';
import { register } from '../services/AuthService';
import Swal from 'sweetalert2';
import './RegisterComponent.css';

const RegistrationComponent = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        role: 'farmer',
        location: '',
        profileImage: null
    });
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prevState => ({
                ...prevState,
                profileImage: file
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register({
                ...formData,
                name: `${formData.firstName} ${formData.lastName}`,
                contactInfo: formData.phone,
                dateOfJoining: new Date().toISOString()
            });
            
            Swal.fire({
                icon: 'success',
                title: 'Registration successful!',
                showConfirmButton: false,
                timer: 1500
            });
            
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
                role: 'farmer',
                location: '',
                profileImage: null
            });
            setImagePreview(null);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Registration failed. Please try again.',
                showConfirmButton: false,
                timer: 1500
            });
            console.error('Error during registration:', err);
        }
    };

    return (
        <div className="registration-card">
            <div className="registration-header">
                <h1 className="registration-title">Registration Form</h1>
                <div className="logo-container">
                    {imagePreview ? (
                        <img 
                            src={imagePreview} 
                            alt="Profile Preview" 
                            className="profile-preview"
                        />
                    ) : (
                        <div className="default-avatar">
                            <span>Upload Photo</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="registration-content">
                <form onSubmit={handleSubmit} className="registration-form">
                    <div className="form-row">
                        <div className="form-group">
                            <div className="floating-input-group">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                                <label>First Name</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="floating-input-group">
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                                <label>Last Name</label>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <div className="floating-input-group">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                                <label>Email Address</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="floating-input-group">
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                                <label>Phone Number</label>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <div className="floating-input-group">
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                                <label>Location</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="floating-input-group">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder=" "
                                    required
                                />
                                <label>Password</label>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <div className="floating-input-group">
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="farmer">Farmer</option>
                                    <option value="admin">Admin</option>
                                    <option value="agronomist">Agronomist</option>
                                </select>
                                <label>Role</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="file-input-group">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    id="profile-image"
                                />
                                <label htmlFor="profile-image">Choose Profile Picture</label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="submit-button">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationComponent;