import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./UserProfile.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const { userId, isLoggedIn, isLoading } = useAuth();
    const {  role, user, logout } = useAuth();
     const { login: authLogin } = useAuth();
    const [userProfile, setUserProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        location: "",
        contactInfo: "",
        profileImage: null,
    });
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [profileImage, setprofileImage] = useState(null);
    const [error, setError] = useState("");

    const apiBaseUrl = "http://localhost:8080/api/users";

    // Fetch user profile
    useEffect(() => {
        if (!userId || !isLoggedIn || isLoading) return;

        axios
            .get(`${apiBaseUrl}/${userId}/profile`)
            .then((response) => {
                setUserProfile(response.data);
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    location: response.data.location,
                    contactInfo: response.data.contactInfo,
                    profileImage: null,
                });
                setProfileImagePreview(response.data.profileImageUrl);
                const imageUrl = response.data.profileImageUrl;
            if (imageUrl) {
                const imageName = imageUrl.split('/').pop(); // Extracts 'user_2_75mohoid.png'
                setprofileImage(imageName);
            }
            })
            .catch((error) => console.error("Error fetching user profile:", error));
    }, [userId, isLoggedIn, isLoading]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profileImage: file });
        setProfileImagePreview(URL.createObjectURL(file));
    };

    const handleEditToggle = () => {
        setEditMode(!editMode);
        setError(""); // Clear error message when toggling edit mode
    };

const navigate = useNavigate();

const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (
        formData.name === userProfile.name &&
        formData.email === userProfile.email &&
        formData.location === userProfile.location &&
        formData.contactInfo === userProfile.contactInfo &&
        !formData.profileImage
    ) {
        setError("No changes made to the profile.");
        return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("contactInfo", formData.contactInfo);

    if (formData.profileImage) {
        formDataToSend.append("profileImage", formData.profileImage);
    }

    try {
        const response = await axios.put(`${apiBaseUrl}/${userId}/profile`, formDataToSend, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        const imageUrl = response.data.profileImageUrl;
        var imageName = "";
            if (imageUrl) {
                 imageName = imageUrl.split('/').pop(); // Extracts 'user_2_75mohoid.png'
                setprofileImage(imageName);
            }

        const updatedResponse = {
            ...response.data, // Keep all existing response properties
            profileImagePath: imageName, // Manually add profileImagePath
        };
        console.log(updatedResponse);
        setUserProfile(response.data);
        authLogin(role, updatedResponse);
        setEditMode(false);
        Swal.fire({
            icon: 'success',
            title: 'Profile updated successfully!',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            navigate(" http://localhost:3000"); // Redirect to home after the alert
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        setError("Failed to update profile. Please try again.");
    }
};


    if (isLoading) return <div>Loading...</div>;
    if (!isLoggedIn) return <div>Please log in to view your profile.</div>;
    if (!userProfile) return <div>Loading profile...</div>;

    return (
        <div className="userprofile-container">
            <h2>User Profile</h2>

            {/* Profile Image Section */}
            <div className="profile-image-container">
                {profileImagePreview && (
                    <img
                        src={profileImagePreview}
                        alt="Profile Preview"
                        className="profile-image"
                    />
                )}
                {!profileImagePreview && (
                    <div className="profile-image-placeholder">No Image</div>
                )}
            </div>

            {error && <p className="alert alert-error">{error}</p>}

            <form onSubmit={handleSaveChanges}>
    {/* User Details Section */}
              <div className="form-group">
                  <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder=" "
                      required
                      disabled={!editMode}
                  />
                  <label htmlFor="name">Name</label>
              </div>
              <div className="form-group">
                  <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder=" "
                      required
                      disabled={!editMode}
                  />
                  <label htmlFor="email">Email</label>
              </div>
              <div className="form-group">
                  <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder=" "
                      required
                      disabled={!editMode}
                  />
                  <label htmlFor="location">Location</label>
              </div>
              <div className="form-group">
                  <input
                      type="text"
                      id="contactInfo"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleInputChange}
                      placeholder=" "
                      required
                      disabled={!editMode}
                  />
                  <label htmlFor="contactInfo">Contact Info</label>
              </div>
              {editMode && (
                  <div className="form-group">
                      <input
                          type="file"
                          id="profileImage"
                          accept="image/*"
                          onChange={handleFileChange}
                      />
                      <label htmlFor="profileImage">Upload Profile Image</label>
                  </div>
              )}
              <div className="button-group">
                  {editMode ? (
                      <>
                          <button type="submit" className="submit-btn">
                              Save Changes
                          </button>
                          <button
                              type="button"
                              className="cancel-btn"
                              onClick={handleEditToggle}
                          >
                              Cancel
                          </button>
                      </>
                  ) : (
                      <button
                          type="button"
                          className="edit-btn"
                          onClick={handleEditToggle}
                      >
                          Edit Profile
                      </button>
                  )}
              </div>
          </form>
        </div>
    );
};

export default UserProfile;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import "./UserProfile.css";
// import { useAuth } from "../contexts/AuthContext";
// const UserProfile = () => {
//   const { userId, isLoggedIn, isLoading } = useAuth();
//   const [userProfile, setUserProfile] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//       name: "",
//       email: "",
//       location: "",
//       contactInfo: "",
//       profileImage: "",
//   });
//   const [profileImagePreview, setProfileImagePreview] = useState(null);
//   const [error, setError] = useState("");

//   const apiBaseUrl = "http://localhost:8080/api/users"; // Ensure this is your actual base URL

//   // Fetch user profile
//   useEffect(() => {
//       if (!userId || !isLoggedIn || isLoading) return;

//       axios
//           .get(`${apiBaseUrl}/${userId}/profile`)
//           .then((response) => {
//               setUserProfile(response.data);
//               setFormData({
//                   name: response.data.name,
//                   email: response.data.email,
//                   location: response.data.location,
//                   contactInfo: response.data.contactInfo,
//                   profileImage: null,
//               });

//               const imageUrl = response.data.profileImageUrl;
//               if (imageUrl) {
//                   // If the URL is relative, prepend the base URL
//                   const fullImageUrl = imageUrl.startsWith('http') 
//                       ? imageUrl 
//                       : `${apiBaseUrl}${imageUrl}`; // Concatenate base API URL with the relative path
//                   setProfileImagePreview(fullImageUrl); // Use the actual image URL from backend
//               } else {
//                   setProfileImagePreview(null); // No image available, set as null
//               }
//           })
//           .catch((error) => {
//               console.error("Error fetching user profile:", error);
//           });
//   }, [userId, isLoggedIn, isLoading]);

//   const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//       const file = e.target.files[0];
//       setFormData({ ...formData, profileImage: file });
//       setProfileImagePreview(URL.createObjectURL(file)); // Set preview for the new image
//   };

//   const handleEditToggle = () => {
//       setEditMode(!editMode);
//       setError(""); // Clear error message when toggling edit mode
//   };

//   const handleSaveChanges = async (e) => {
//       e.preventDefault();

//       if (
//           formData.name === userProfile.name &&
//           formData.email === userProfile.email &&
//           formData.location === userProfile.location &&
//           formData.contactInfo === userProfile.contactInfo &&
//           !formData.profileImage
//       ) {
//           setError("No changes made to the profile.");
//           return;
//       }

//       const formDataToSend = new FormData();
//       formDataToSend.append("name", formData.name);
//       formDataToSend.append("email", formData.email);
//       formDataToSend.append("location", formData.location);
//       formDataToSend.append("contactInfo", formData.contactInfo);

//       if (formData.profileImage) {
//           formDataToSend.append("profileImage", formData.profileImage);
//       }

//       try {
//           const response = await axios.put(`${apiBaseUrl}/${userId}/profile`, formDataToSend, {
//               headers: { "Content-Type": "multipart/form-data" },
//           });
//           setUserProfile(response.data);
//           setEditMode(false);
//           Swal.fire({
//               icon: 'success',
//               title: 'Profile updated successfully!',
//               showConfirmButton: false,
//               timer: 1500
//           });
//       } catch (error) {
//           console.error("Error updating profile:", error);
//           setError("Failed to update profile. Please try again.");
//       }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (!isLoggedIn) return <div>Please log in to view your profile.</div>;
//   if (!userProfile) return <div>Loading profile...</div>;

//   return (
//       <div className="userprofile-container">
//           <h2>User Profile</h2>

//           {/* Profile Image Section */}
//           <div className="profile-image-container">
//               {editMode ? (
//                   // During edit mode, use the preview if file is selected
//                   profileImagePreview ? (
//                       <img
//                           src={profileImagePreview}
//                           alt="Profile Preview"
//                           className="profile-image"
//                       />
//                   ) : (
//                       <div className="profile-image-placeholder">No Image</div>
//                   )
//               ) : (
//                   // Once editing is done, show the actual image from the backend
//                   profileImagePreview ? (
//                       <img
//                           src={profileImagePreview}
//                           alt="Profile Image"
//                           className="profile-image"
//                       />
//                   ) : (
//                       <div className="profile-image-placeholder">No Image</div>
//                   )
//               )}
//           </div>

//           {error && <p className="alert alert-error">{error}</p>}

//           <form onSubmit={handleSaveChanges}>
//               {/* User Details Section */}
//               <div className="form-group">
//                   <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       placeholder=" "
//                       required
//                       disabled={!editMode}
//                   />
//                   <label htmlFor="name">Name</label>
//               </div>
//               <div className="form-group">
//                   <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       placeholder=" "
//                       required
//                       disabled={!editMode}
//                   />
//                   <label htmlFor="email">Email</label>
//               </div>
//               <div className="form-group">
//                   <input
//                       type="text"
//                       id="location"
//                       name="location"
//                       value={formData.location}
//                       onChange={handleInputChange}
//                       placeholder=" "
//                       required
//                       disabled={!editMode}
//                   />
//                   <label htmlFor="location">Location</label>
//               </div>
//               <div className="form-group">
//                   <input
//                       type="text"
//                       id="contactInfo"
//                       name="contactInfo"
//                       value={formData.contactInfo}
//                       onChange={handleInputChange}
//                       placeholder=" "
//                       required
//                       disabled={!editMode}
//                   />
//                   <label htmlFor="contactInfo">Contact Info</label>
//               </div>
//               {editMode && (
//                   <div className="form-group">
//                       <input
//                           type="file"
//                           id="profileImage"
//                           accept="image/*"
//                           onChange={handleFileChange}
//                       />
//                       <label htmlFor="profileImage">Upload Profile Image</label>
//                   </div>
//               )}
//               <div className="button-group">
//                   {editMode ? (
//                       <>
//                           <button type="submit" className="submit-btn">
//                               Save Changes
//                           </button>
//                           <button
//                               type="button"
//                               className="cancel-btn"
//                               onClick={handleEditToggle}
//                           >
//                               Cancel
//                           </button>
//                       </>
//                   ) : (
//                       <button
//                           type="button"
//                           className="edit-btn"
//                           onClick={handleEditToggle}
//                       >
//                           Edit Profile
//                       </button>
//                   )}
//               </div>
//           </form>
//       </div>
//   );
// };

// export default UserProfile;
