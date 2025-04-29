// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../services/axiosInstance';
// import { useAuth } from '../contexts/AuthContext';
// import Swal from 'sweetalert2';
// import './SpecialistForm.css';

// const SpecialistForm = () => {
//     const { userId } = useAuth();
//     const [selectedSpecializations, setSelectedSpecializations] = useState([]);

//     const specializationOptions = [
//         "Soil Science", "Crop Management", "Pest Control", "Irrigation", "Organic Farming"
//     ];

//     useEffect(() => {
//         axiosInstance.get(`/api/users/${userId}/specializations`)
//             .then(response => {
//                 setSelectedSpecializations(response.data.specialismTypes || []);
//             })
//             .catch(error => console.error("Error fetching specializations:", error));
//     }, [userId]);

//     const handleCheckboxChange = (specialization) => {
//         setSelectedSpecializations((prev) =>
//             prev.includes(specialization) ? prev.filter((spec) => spec !== specialization) : [...prev, specialization]
//         );
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axiosInstance.put(`/api/users/${userId}/specializations`, 
//                 selectedSpecializations,
//                 { headers: { "Content-Type": "application/json" } }
//             );

//             Swal.fire({
//                 icon: 'success',
//                 title: 'Success!',
//                 text: 'Specializations updated successfully.',
//                 timer: 2000,
//                 showConfirmButton: false
//             });
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error!',
//                 text: 'Failed to update specializations. Please try again.',
//             });
//         }
//     };

//     return (
//         <div className="specialist-container">
//             <h2 className="specialist-title">Manage Your Specializations</h2>
//             <form onSubmit={handleSubmit} className="specializations-form">
//                 {specializationOptions.map((spec) => (
//                     <div key={spec} className="checkbox-container">
//                         <input
//                             className="checkbox-input"
//                             type="checkbox"
//                             id={`spec-${spec}`}
//                             value={spec}
//                             checked={selectedSpecializations.includes(spec)}
//                             onChange={() => handleCheckboxChange(spec)}
//                         />
//                         <label className="checkbox-label" htmlFor={`spec-${spec}`}>
//                             {spec}
//                         </label>
//                     </div>
//                 ))}
//                 <button type="submit" className="submit-button">
//                     Save Specializations
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default SpecialistForm;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';
import './SpecialistForm.css';

const SpecialistForm = () => {
    const { userId } = useAuth();
    const [selectedSpecializations, setSelectedSpecializations] = useState([]);

    const specializationOptions = [
        "Soil Science", "Crop Management", "Pest Control", "Irrigation", "Organic Farming"
    ];

    useEffect(() => {
        const fetchSpecializations = async () => {
            try {
                const response = await axiosInstance.get(`/api/users/${userId}/specializations`);
                setSelectedSpecializations(response.data || []);
            } catch (error) {
                console.error("Error fetching specializations:", error);
            }
        };

        fetchSpecializations();
    }, [userId]);

    const handleCheckboxChange = (specialization) => {
        setSelectedSpecializations((prev) =>
            prev.includes(specialization) ? prev.filter((spec) => spec !== specialization) : [...prev, specialization]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/api/users/${userId}/specializations`, 
                selectedSpecializations,
                { headers: { "Content-Type": "application/json" } }
            );

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Specializations updated successfully.',
                timer: 2000,
                showConfirmButton: false
            });

            // Fetch updated specializations
            const response = await axiosInstance.get(`/api/users/${userId}/specializations`);
            setSelectedSpecializations(response.data || []);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update specializations. Please try again.',
            });
        }
    };

    return (
        <div className="specialist-container">
            <h2 className="specialist-title">Manage Your Specializations</h2>
            <form onSubmit={handleSubmit} className="specializations-form">
                {specializationOptions.map((spec) => (
                    <div key={spec} className="checkbox-container">
                        <input
                            className="checkbox-input"
                            type="checkbox"
                            id={`spec-${spec}`}
                            value={spec}
                            checked={selectedSpecializations.includes(spec)}
                            onChange={() => handleCheckboxChange(spec)}
                        />
                        <label className="checkbox-label" htmlFor={`spec-${spec}`}>
                            {spec}
                        </label>
                    </div>
                ))}
                <button type="submit" className="submit-button">
                    Save Specializations
                </button>
            </form>
        </div>
    );
};

export default SpecialistForm;
