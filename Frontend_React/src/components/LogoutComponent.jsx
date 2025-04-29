import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LogoutComponent = () => {
    const { logout } = useAuth();

    useEffect(() => {
        logout(); // This will handle SweetAlert confirmation and navigation
    }, [logout]);

    return null;
};

export default LogoutComponent;
