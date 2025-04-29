import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import SpecialistForm from './SpecialistForm';
import axios from 'axios';
import './AgronomistPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MarqueeMessage from './MarqueeMessage';

const AgronomistPage = () => {
    const { userId } = useAuth();
    const [agronomistDetails, setAgronomistDetails] = useState({});

    useEffect(() => {
        // Fetch agronomist details based on userId
        axios.get(`http://localhost:8080/api/users/${userId}`)
            .then(response => {
                setAgronomistDetails(response.data);
            })
            .catch(error => console.error("Error fetching agronomist details:", error));
    }, [userId]);

    return (
        <>
            <MarqueeMessage/>
            <div className="container mt-4">
            <h2 className="text-center text-primary">Agronomist Dashboard</h2>
            
            <div className="card shadow-lg p-4 mb-4 bg-white rounded">
                <h3 className="text-secondary">Profile Details</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Name:</strong> {agronomistDetails.name}</li>
                    <li className="list-group-item"><strong>Email:</strong> {agronomistDetails.email}</li>
                    <li className="list-group-item"><strong>Location:</strong> {agronomistDetails.location}</li>
                    <li className="list-group-item"><strong>Contact Info:</strong> {agronomistDetails.contactInfo}</li>
                    <li className="list-group-item"><strong>Date of Joining:</strong> {agronomistDetails.dateOfJoining}</li>
                </ul>
            </div>

            {/* Specialist Form Component */}
            <SpecialistForm />
        </div>
        </>
        
    );
};

export default AgronomistPage;
