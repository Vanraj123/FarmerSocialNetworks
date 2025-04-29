import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AdminMessageForm.css';

const AdminMessageForm = ({ adminId }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a message',
            });
            return;
        }

        try {
            await axios.post(`http://localhost:8080/api/admin/message?adminId=${adminId}`, message, {
                headers: {
                    'Content-Type': 'text/plain',
                },
            });

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Message sent successfully!',
            });
            setMessage('');
        } catch (err) {
            console.error('Error sending the message:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to send the message. Please try again later.',
            });
        }
    };

    return (
        <div className="admin-message-form">
            <h2>Send Admin Message</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message here"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default AdminMessageForm;
