// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import HomeComponent from './components/HomeComponent';
// import LoginComponent from './components/LoginComponent';
// import RegisterComponent from './components/RegisterComponent';
// import PostSectionComponent from './components/PostSectionComponent';
// import PostFormComponent from './components/PostFormComponent';
// import AdminPage from './components/AdminPage';
// import FarmerPage from './components/FarmerPage';
// import AgronomistPage from './components/AgronomistPage';
// import CropResourceUploadComponent from './components/CropResourceUploadComponent';
// import CropResourceListComponent from './components/CropResourceListComponent';
// import HeaderComponent from './components/HeaderComponent';
// import FooterComponent from './components/FooterComponent';
// import LogoutComponent from './components/LogoutComponent';
// import ProtectedRoute from './components/ProtectedRoute';

// const App = () => {
//     return (
//         <AuthProvider>
//             <Router>
//                 <HeaderComponent />
//                 <Routes>
//                     {/* Public Routes */}
//                     <Route path="/" element={<HomeComponent />} />
//                     <Route path="/login" element={<LoginComponent />} />
//                     <Route path="/register" element={<RegisterComponent />} />
//                     <Route path="/posts" element={<PostSectionComponent />} />
//                     <Route path="/post" element={<PostFormComponent />} />


//                     {/* Protected Routes */}
//                     <Route
//                         path="/admin/dashboard"
//                         element={
//                             <ProtectedRoute allowedRoles={['admin']}>
//                                 <AdminPage />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/farmer/dashboard"
//                         element={
//                             <ProtectedRoute allowedRoles={['farmer']}>
//                                 <FarmerPage />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/agronomist/dashboard"
//                         element={
//                             <ProtectedRoute allowedRoles={['agronomist']}>
//                                 <AgronomistPage />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/agronomist/upload"
//                         element={
//                             <ProtectedRoute allowedRoles={['agronomist']}>
//                                 <CropResourceUploadComponent />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/agronomist/resources"
//                         element={
//                             <ProtectedRoute allowedRoles={['agronomist']}>
//                                 <CropResourceListComponent />
//                             </ProtectedRoute>
//                         }
//                     />
//                     {/* Routes for Admin and Farmer */}
//                     <Route
//                         path="/admin/crop-list"
//                         element={
//                             <ProtectedRoute allowedRoles={['admin']}>
//                                 <CropResourceListComponent />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/farmer/crop-list"
//                         element={
//                             <ProtectedRoute allowedRoles={['farmer']}>
//                                 <CropResourceListComponent />
//                             </ProtectedRoute>
//                         }
//                     />

//                     <Route
//                         path="/logout"
//                         element={
//                             <ProtectedRoute>
//                                 <LogoutComponent />
//                             </ProtectedRoute>
//                         }
//                     />
//                     {/* Catch-all route */}
//                     <Route path="*" element={<Navigate to="/" />} />
//                 </Routes>
//                 <FooterComponent />
//             </Router>
//         </AuthProvider>
//     );
// };

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './contexts/AuthContext';
// import HomeComponent from './components/HomeComponent';
// import LoginComponent from './components/LoginComponent';
// import RegisterComponent from './components/RegisterComponent';
// import PostSectionComponent from './components/PostSectionComponent';
// import PostFormComponent from './components/PostFormComponent';
// import AdminPage from './components/AdminPage';
// import FarmerPage from './components/FarmerPage';
// import AgronomistPage from './components/AgronomistPage';
// import CropResourceUploadComponent from './components/CropResourceUploadComponent';
// import CropResourceListComponent from './components/CropResourceListComponent';
// import HeaderComponent from './components/HeaderComponent';
// import FooterComponent from './components/FooterComponent';
// import LogoutComponent from './components/LogoutComponent';
// import UserProfile from './components/UserProfile'; // Import the UserProfile component
// import ProtectedRoute from './components/ProtectedRoute';

// const App = () => {
//     return (
//         <Router>
//             <AuthProvider>
//                 <HeaderComponent />
//                 <Routes>
//                     {/* Public Routes */}
//                     <Route path="/" element={<HomeComponent />} />
//                     <Route path="/login" element={<LoginComponent />} />
//                     <Route path="/register" element={<RegisterComponent />} />
//                     <Route path="/posts" element={<PostSectionComponent />} />
//                     <Route path="/post" element={<PostFormComponent />} />

//                     {/* Protected Routes */}
//                     <Route
//                         path="/admin/dashboard"
//                         element={
//                             <ProtectedRoute allowedRoles={['admin']}>
//                                 <AdminPage />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/farmer/dashboard"
//                         element={
//                             <ProtectedRoute allowedRoles={['farmer']}>
//                                 <FarmerPage />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/agronomist/dashboard"
//                         element={
//                             <ProtectedRoute allowedRoles={['agronomist']}>
//                                 <AgronomistPage />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/agronomist/upload"
//                         element={
//                             <ProtectedRoute allowedRoles={['agronomist']}>
//                                 <CropResourceUploadComponent />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/agronomist/resources"
//                         element={
//                             <ProtectedRoute allowedRoles={['agronomist']}>
//                                 <CropResourceListComponent />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/admin/crop-list"
//                         element={
//                             <ProtectedRoute allowedRoles={['admin']}>
//                                 <CropResourceListComponent />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/farmer/crop-list"
//                         element={
//                             <ProtectedRoute allowedRoles={['farmer']}>
//                                 <CropResourceListComponent />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/profile"
//                         element={
//                             <ProtectedRoute>
//                                 <UserProfile userId="current" />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/logout"
//                         element={
//                             <ProtectedRoute>
//                                 <LogoutComponent />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route path="*" element={<Navigate to="/" />} />
//                 </Routes>
//                 <FooterComponent />
//             </AuthProvider>
//         </Router>
//     );
// };

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './contexts/AuthContext';
// import HomeComponent from './components/HomeComponent';
// import LoginComponent from './components/LoginComponent';
// import RegisterComponent from './components/RegisterComponent';
// import PostSectionComponent from './components/PostSectionComponent';
// import PostFormComponent from './components/PostFormComponent';
// import AdminPage from './components/AdminPage';
// import FarmerPage from './components/FarmerPage';
// import AgronomistPage from './components/AgronomistPage';
// import CropResourceUploadComponent from './components/CropResourceUploadComponent';
// import CropResourceListComponent from './components/CropResourceListComponent';
// import HeaderComponent from './components/HeaderComponent';
// import FooterComponent from './components/FooterComponent';
// import LogoutComponent from './components/LogoutComponent';
// import UserProfile from './components/UserProfile';
// import ProtectedRoute from './components/ProtectedRoute';
// import AdminMessageForm from './components/AdminMessageForm';

// const AdminMessageFormWrapper = () => {
//     const { userId } = useAuth();
//     return <AdminMessageForm adminId={userId} />;
// };

// const App = () => {
//     return (
//         <Router>
//             <AuthProvider>
//                 <HeaderComponent />
//                 <Routes>
//                     {/* Public Routes */}
//                     <Route path="/" element={<HomeComponent />} />
//                     <Route path="/login" element={<LoginComponent />} />
//                     <Route path="/register" element={<RegisterComponent />} />
//                     <Route path="/posts" element={<PostSectionComponent />} />
//                     <Route path="/post" element={<PostFormComponent />} />

//                     {/* Protected Routes */}
//                     <Route
//                         path="/admin/dashboard"
//                         element={
//                             <ProtectedRoute allowedRoles={['admin']}>
//                                 <AdminPage />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/farmer/dashboard"
//                         element={
//                             <ProtectedRoute allowedRoles={['farmer']}>
//                                 <FarmerPage />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/agronomist/dashboard"
//                         element={
//                             <ProtectedRoute allowedRoles={['agronomist']}>
//                                 <AgronomistPage />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/agronomist/upload"
//                         element={
//                             <ProtectedRoute allowedRoles={['agronomist']}>
//                                 <CropResourceUploadComponent />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/agronomist/resources"
//                         element={
//                             <ProtectedRoute allowedRoles={['agronomist']}>
//                                 <CropResourceListComponent />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/admin/crop-list"
//                         element={
//                             <ProtectedRoute allowedRoles={['admin']}>
//                                 <CropResourceListComponent />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/farmer/crop-list"
//                         element={
//                             <ProtectedRoute allowedRoles={['farmer']}>
//                                 <CropResourceListComponent />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/profile"
//                         element={
//                             <ProtectedRoute>
//                                 <UserProfile userId="current" />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/logout"
//                         element={
//                             <ProtectedRoute>
//                                 <LogoutComponent />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route
//                         path="/admin/message-form"
//                         element={
//                             <ProtectedRoute allowedRoles={['admin']}>
//                                 <AdminMessageFormWrapper />
//                             </ProtectedRoute>
//                         }
//                     />
//                     <Route path="*" element={<Navigate to="/" />} />
//                 </Routes>
//                 <FooterComponent />
//             </AuthProvider>
//         </Router>
//     );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import PostSectionComponent from './components/PostSectionComponent';
import PostFormComponent from './components/PostFormComponent';
import AdminPage from './components/AdminPage';
import FarmerPage from './components/FarmerPage';
import AgronomistPage from './components/AgronomistPage';
import CropResourceUploadComponent from './components/CropResourceUploadComponent';
import CropResourceListComponent from './components/CropResourceListComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import LogoutComponent from './components/LogoutComponent';
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import AdminMessageForm from './components/AdminMessageForm';
import UploadShorts from './components/UploadShorts'; // Import UploadShorts
import ShortsFeed from './components/ShortsFeed'; // Import ShortsFeed
// import ChatScreen from './components/chat/ChatScreen';
import Home from './components/chat/HomePage';
import ImageUploader from './components/ImageUploader';

const AdminMessageFormWrapper = () => {
    const { userId } = useAuth();
    return <AdminMessageForm adminId={userId} />;
};

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <HeaderComponent />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomeComponent />} /> {/* Ensure home page renders correctly */}
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/register" element={<RegisterComponent />} />
                    <Route path="/posts" element={<PostSectionComponent />} />
                    <Route path="/post" element={<PostFormComponent />} />
                    <Route path="/image-uploader" element={<ImageUploader />} /> {/* ImageUploader route */}

                    {/* Protected Routes */}
                    <Route path="/message" element={<Home />} />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/farmer/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={['farmer']}>
                                <FarmerPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/agronomist/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={['agronomist']}>
                                <AgronomistPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/agronomist/upload"
                        element={
                            <ProtectedRoute allowedRoles={['agronomist']}>
                                <CropResourceUploadComponent />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/agronomist/resources"
                        element={
                            <ProtectedRoute allowedRoles={['agronomist']}>
                                <CropResourceListComponent />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/crop-list"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <CropResourceListComponent />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/farmer/crop-list"
                        element={
                            <ProtectedRoute allowedRoles={['farmer']}>
                                <CropResourceListComponent />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <UserProfile userId="current" />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/logout"
                        element={
                            <ProtectedRoute>
                                <LogoutComponent />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/message-form"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <AdminMessageFormWrapper />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/upload-shorts"
                        element={
                            <ProtectedRoute allowedRoles={['farmer', 'agronomist', 'admin']}> {/* Added admin */}
                                <UploadShorts />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/shorts-feed"
                        element={
                            <ProtectedRoute allowedRoles={['farmer', 'agronomist', 'admin']}> {/* Added admin */}
                                <ShortsFeed />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </AuthProvider>
            <FooterComponent/>
        </Router>
    );
};


export default App;
