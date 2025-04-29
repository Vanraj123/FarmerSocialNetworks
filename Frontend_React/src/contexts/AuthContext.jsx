import React, { createContext, useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


// Create AuthContext
const AuthContext = createContext();

// Hook for accessing the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider to wrap the app
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null); // Add userId
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const parsedUser = JSON.parse(loggedInUser);
            setIsLoggedIn(true);
            setUser(parsedUser);
            setRole(parsedUser.role);
            setUserId(parsedUser.id);
        }
        setIsLoading(false);
    }, []);

    const login = (userRole, userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setIsLoggedIn(true);
        setRole(userRole);
        setUser(userData);
        setUserId(userData.id);
    };

    const logout = async () => {
        const result = await Swal.fire({
            title: '<strong>Confirm Logout</strong>',
            html: 'Are you sure you want to <b>log out</b> of your account?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '<i class="fa fa-check"></i> Yes, log me out!',
            cancelButtonText: '<i class="fa fa-times"></i> Cancel',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            localStorage.removeItem('user');
            setIsLoggedIn(false);
            setRole(null);
            setUser(null);
            setUserId(null);
            Swal.fire({
                title: 'Logged Out!',
                text: 'You have been successfully logged out.',
                icon: 'success',
                confirmButtonColor: '#4CAF50',
                background: '#fefefe',
            });
            navigate('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, role, user, userId, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
