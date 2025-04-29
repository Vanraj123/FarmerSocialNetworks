// import React from 'react';
// import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext'; // Import useAuth hook
// import './HeaderComponent.css';

// const HeaderComponent = () => {
//     const { isLoggedIn, role, user, logout } = useAuth(); // Get the logged-in user

//     return (
//         <Navbar bg="dark" variant="dark" expand="lg" className="header-navbar">
//             <Container>
//                 <Navbar.Brand as={Link} to="/">Farmer's Social Network</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="ml-auto">
//                         <Nav.Link as={Link} to="/">Home</Nav.Link>
//                         {!isLoggedIn ? (
//                             <>
//                                 <Nav.Link as={Link} to="/login">Login</Nav.Link>
//                                 <Nav.Link as={Link} to="/register">Register</Nav.Link>
//                             </>
//                         ) : (
//                             <>
//                                 {role === 'admin' && (
//                                     <>
//                                         <Nav.Link as={Link} to="/admin/dashboard">Admin Dashboard</Nav.Link>
//                                         <Nav.Link as={Link} to="/posts">Manage Posts</Nav.Link>
//                                         {/* Navigate to Admin Crop List */}
//                                         <Nav.Link as={Link} to="/admin/crop-list">Crop List</Nav.Link>
//                                     </>
//                                 )}

//                                 {role === 'farmer' && (
//                                     <>
//                                         <Nav.Link as={Link} to="/farmer/dashboard">Farmer Dashboard</Nav.Link>
//                                         <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
//                                         <Nav.Link as={Link} to="/post">Create Post</Nav.Link>
//                                         {/* Navigate to Farmer Crop List */}
//                                         <Nav.Link as={Link} to="/farmer/crop-list">Crop List</Nav.Link>
                                        
//                                     </>
//                                 )}

//                                 {role === 'agronomist' && (
//                                     <>
//                                         <Nav.Link as={Link} to="/agronomist/dashboard">Agronomist Dashboard</Nav.Link>
                                        
//                                         {/* Dropdown for Agronomist */}
//                                         <NavDropdown title="Crop Resources" id="agronomist-crop-resources-dropdown">
//                                             <NavDropdown.Item as={Link} to="/agronomist/upload">Upload Crop Resource</NavDropdown.Item>
//                                             <NavDropdown.Item as={Link} to="/agronomist/resources">Crop Resource List</NavDropdown.Item>
//                                         </NavDropdown>
                                        
//                                         <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
//                                     </>
//                                 )}

//                                 <Nav.Link as={Link} to="/logout" onClick={logout}>Logout</Nav.Link>
//                             </>
//                         )}
//                     </Nav>
//                     {isLoggedIn && <div className="welcome-message">Welcome, {user.name}</div>} {/* Styled welcome message */}
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// };

// export default HeaderComponent;


// import React from 'react';
// import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext'; // Import useAuth hook
// import './HeaderComponent.css';

// const HeaderComponent = () => {
//     const { isLoggedIn, role, user, logout } = useAuth(); // Get the logged-in user

//     return (
//         <Navbar bg="dark" variant="dark" expand="lg" className="header-navbar">
//             <Container>
//                 <Navbar.Brand as={Link} to="/">Farmer's Social Network</Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="ml-auto">
//                         <Nav.Link as={Link} to="/">Home</Nav.Link>
//                         {!isLoggedIn ? (
//                             <>
//                                 <Nav.Link as={Link} to="/login">Login</Nav.Link>
//                                 <Nav.Link as={Link} to="/register">Register</Nav.Link>
//                             </>
//                         ) : (
//                             <>
//                                 {role === 'admin' && (
//                                     <>
//                                         <Nav.Link as={Link} to="/admin/dashboard">Admin Dashboard</Nav.Link>
//                                         <Nav.Link as={Link} to="/posts">Manage Posts</Nav.Link>
//                                         <Nav.Link as={Link} to="/admin/crop-list">Crop List</Nav.Link>
//                                     </>
//                                 )}

//                                 {role === 'farmer' && (
//                                     <>
//                                         <Nav.Link as={Link} to="/farmer/dashboard">Farmer Dashboard</Nav.Link>
//                                         <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
//                                         <Nav.Link as={Link} to="/post">Create Post</Nav.Link>
//                                         <Nav.Link as={Link} to="/farmer/crop-list">Crop List</Nav.Link>
//                                     </>
//                                 )}

//                                 {role === 'agronomist' && (
//                                     <>
//                                         <Nav.Link as={Link} to="/agronomist/dashboard">Agronomist Dashboard</Nav.Link>
//                                         <NavDropdown title="Crop Resources" id="agronomist-crop-resources-dropdown">
//                                             <NavDropdown.Item as={Link} to="/agronomist/upload">Upload Crop Resource</NavDropdown.Item>
//                                             <NavDropdown.Item as={Link} to="/agronomist/resources">Crop Resource List</NavDropdown.Item>
//                                         </NavDropdown>
//                                         <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
//                                     </>
//                                 )}

//                                 {/* Profile Dropdown */}
//                                 <NavDropdown
//                                     title={
//                                         <img
//                                         src={user?.profileImagePath ? `http://localhost/uploads/${user.profileImagePath}` : '/default-profile.png'}
//                                         alt="Profile"
//                                         className="profile-image"
//                                         />
//                                     }
//                                     id="user-profile-dropdown"
//                                 >

//                                     <NavDropdown.Item as={Link} to="/profile">View Profile</NavDropdown.Item>
//                                     <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
//                                 </NavDropdown>
//                             </>
//                         )}
//                     </Nav>
//                 </Navbar.Collapse>
//             </Container>
//         </Navbar>
//     );
// };

// export default HeaderComponent;
import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './HeaderComponent.css';
import { 
    PlaySquareIcon, 
    VideoIcon, 
    FilmIcon, 
    YoutubeIcon, 
    MessageSquareIcon // Added message icon
} from 'lucide-react';

const HeaderComponent = () => {
    const { isLoggedIn, role, user, logout } = useAuth();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="header-navbar">
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand-text">
                    Farmer's Social Network
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto nav-links">
                        <Nav.Link as={Link} to="/" className="nav-link-item">Home</Nav.Link>
                        {!isLoggedIn ? (
                            <>
                                <Nav.Link as={Link} to="/login" className="nav-link-item">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register" className="nav-link-item">Register</Nav.Link>
                            </>
                        ) : (
                            <>
                                {role === 'admin' && (
                                    <>
                                        <Nav.Link as={Link} to="/admin/dashboard" className="nav-link-item">Admin Dashboard</Nav.Link>
                                        <Nav.Link as={Link} to="/posts" className="nav-link-item">Manage Posts</Nav.Link>
                                        <Nav.Link as={Link} to="/admin/crop-list" className="nav-link-item">Crop List</Nav.Link>
                                        <Nav.Link as={Link} to="/admin/message-form" className="nav-link-item">Send Message</Nav.Link>
                                        {/* Add links for Shorts Upload and Shorts Feed */}
                                        <NavDropdown 
                                            title={<FilmIcon size={20} />} 
                                            id="admin-shorts-dropdown"
                                            className="nav-dropdown"
                                        >
                                            <NavDropdown.Item as={Link} to="/upload-shorts" className="dropdown-item">Upload Shorts</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/shorts-feed" className="dropdown-item">Shorts Feed</NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                )}

                                {role === 'farmer' && (
                                    <>
                                        <Nav.Link as={Link} to="/farmer/dashboard" className="nav-link-item">Farmer Dashboard</Nav.Link>
                                        <Nav.Link as={Link} to="/posts" className="nav-link-item">Posts</Nav.Link>
                                        <Nav.Link as={Link} to="/post" className="nav-link-item">Create Post</Nav.Link>
                                        <Nav.Link as={Link} to="/farmer/crop-list" className="nav-link-item">Crop List</Nav.Link>
                                        <Nav.Link as={Link} to="/image-uploader" className="nav-link-item">AI Crop Diagnosis</Nav.Link> {/* Added ImageUploader link */}
                                        <NavDropdown 
                                            title={<FilmIcon size={20} />} 
                                            id="farmer-shorts-dropdown"
                                            className="nav-dropdown"
                                        >
                                            <NavDropdown.Item as={Link} to="/upload-shorts" className="dropdown-item">Upload Shorts</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/shorts-feed" className="dropdown-item">Shorts Feed</NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                )}
                                {role === 'agronomist' && (
                                    <>
                                        <Nav.Link as={Link} to="/agronomist/dashboard" className="nav-link-item">Agronomist Dashboard</Nav.Link>
                                        <NavDropdown 
                                            title="Crop Resources" 
                                            id="agronomist-crop-resources-dropdown"
                                            className="nav-dropdown"
                                        >
                                            <NavDropdown.Item as={Link} to="/agronomist/upload" className="dropdown-item">Upload Crop Resource</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/agronomist/resources" className="dropdown-item">Crop Resource List</NavDropdown.Item>
                                        </NavDropdown>
                                        <Nav.Link as={Link} to="/post" className="nav-link-item">Create Post</Nav.Link>
                                        <Nav.Link as={Link} to="/posts" className="nav-link-item">Posts</Nav.Link>
                                        <NavDropdown 
                                            title={<FilmIcon size={20} />}  
                                            id="agronomist-shorts-dropdown"
                                            className="nav-dropdown"
                                        >
                                            <NavDropdown.Item as={Link} to="/upload-shorts" className="dropdown-item">Upload Shorts</NavDropdown.Item>
                                            <NavDropdown.Item as={Link} to="/shorts-feed" className="dropdown-item">Shorts Feed</NavDropdown.Item>
                                        </NavDropdown>
                                    </>
                                )}

                                {/* 🔵 Message Icon for all logged-in users */}
                                <Nav.Link as={Link} to="/message" className="nav-link-item">
                                    <MessageSquareIcon size={24} />
                                </Nav.Link>

                                <NavDropdown
                                    title={
                                        <img
                                            src={user?.profileImagePath ? `http://localhost/uploads/${user.profileImagePath}` : '/default-profile.png'}
                                            alt="Profile"
                                            className="profile-image"
                                        />
                                    }
                                    id="user-profile-dropdown"
                                    className="nav-dropdown"
                                >
                                    <NavDropdown.Item as={Link} to="/profile" className="dropdown-item">View Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logout} className="dropdown-item">Logout</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default HeaderComponent;
