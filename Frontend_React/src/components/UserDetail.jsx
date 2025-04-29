import React from 'react';
import Swal from 'sweetalert2';
import './UserDetail.css';

const UserDetail = ({ user, onDelete }) => {
    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(user.id);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'User has been deleted.',
                    icon: 'success',
                    confirmButtonColor: '#28a745',  // Green color for the success "OK" button
                });
            }
        });
    };

    return (
        <div className="user-detail">
            <h4>{user.name} ({user.role})</h4>
            <div className="user-info">
                <div className="user-info-row">
                    <span className="user-info-key">Email:</span>
                    <span className="user-info-value">{user.email}</span>
                </div>
                <div className="user-info-row">
                    <span className="user-info-key">Location:</span>
                    <span className="user-info-value">{user.location}</span>
                </div>
                <div className="user-info-row">
                    <span className="user-info-key">Contact Info:</span>
                    <span className="user-info-value">{user.contactInfo}</span>
                </div>
                {user.profileImagePath && (
                    <div className="user-info-row">
                        <span className="user-info-key">Profile Image:</span>
                        <span className="user-info-value">
                            <img src={`http://localhost/uploads/${user.profileImagePath}`} alt="Profile" className="profile-image" />
                        </span>
                    </div>
                )}
            </div>
            <button className="delete-button" onClick={handleDelete}>Delete User</button>
        </div>
    );
};

export default UserDetail;
