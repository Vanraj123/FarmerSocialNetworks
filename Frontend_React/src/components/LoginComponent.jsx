import React, { useState } from 'react';
import { login } from '../services/AuthService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './HomeComponent.css';
import './LoginComponent.css';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('farmer');
    const { login: authLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Display a loading SweetAlert
        Swal.fire({
            title: 'Signing in...',
            text: 'Please wait while we authenticate your credentials.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const data = await login(email, password, role);
            console.log('Login successful:', data);
            authLogin(role, data);

            // Display a success SweetAlert
            await Swal.fire({
                icon: 'success',
                title: `Welcome back, ${data.name || 'User'}!`,
                text: `Logged in as ${role.charAt(0).toUpperCase() + role.slice(1)}`,
                showConfirmButton: true,
                confirmButtonColor: '#4CAF50',
            });

            navigate(`/${role}/dashboard`);
        } catch (error) {
            console.error('Login Error:', error);

            // Display an error SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid credentials or role. Please try again.',
                footer: '<a href="/forgot-password">Forgot your password?</a>',
                confirmButtonColor: '#d33',
            });
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=" "
                        required
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=" "
                        required
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <div>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="farmer">Farmer</option>
                        <option value="admin">Admin</option>
                        <option value="agronomist">Agronomist</option>
                    </select>
                    <label htmlFor="role">Role</label>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginComponent;
