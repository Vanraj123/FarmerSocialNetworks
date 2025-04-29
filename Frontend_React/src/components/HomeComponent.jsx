import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth hook
import './HomeComponent.css';
import backgroundVideo from '../assets/Farming.mp4';

const HomeComponent = () => {
    const { isLoggedIn, role } = useAuth(); // Access role and login status from AuthContext

    return (
        <div>
            <div className="video-background">
                <video autoPlay loop muted className="video-bg">
                    <source src={backgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="home-content">
                    <h1>Welcome to Farmer's Social Network</h1>
                    <p>Your community for sharing tips and best practices in farming.</p>
                    <div className="home-buttons">
                        {!isLoggedIn ? (
                            <>
                                <Link to="/login">
                                    <button className="btn btn-primary">Login</button>
                                </Link>
                                <Link to="/register">
                                    <button className="btn btn-secondary">Register</button>
                                </Link>
                            </>
                        ) : (
                            <Link to={`/${role}/dashboard`}>
                                <button className="btn btn-primary">Go to Dashboard</button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeComponent;
