import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isLoggedIn, role, isLoading } = useAuth();

    // Wait for the authentication state to be loaded
    if (isLoading) {
        return null; // Or show a loading spinner
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/" />; // Redirect to home or an unauthorized page
    }

    return children;
};

export default ProtectedRoute;
