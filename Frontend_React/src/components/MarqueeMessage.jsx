import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MarqueeMessage.css';

const NewBadge = () => {
  return (
    <span 
      className="inline-block px-2 py-1 text-xs font-bold uppercase rounded-full animate-pulse"
      style={{
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        color: 'white',
        textShadow: '0 1px 2px rgba(0,0,0,0.2)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginRight: '10px'
      }}
    >
      NEW!!
    </span>
  );
};

const MarqueeMessage = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/admin/message');
                setMessage(response.data.message);
            } catch (err) {
                console.error('Error fetching the message:', err);
            }
        };

        fetchMessage();
    }, []);

    return (
        message ? (
            <div className="marquee-container">
                <div className="marquee">
                    <NewBadge />
                    <p>{message}</p>
                </div>
            </div>
        ) : null
    );
};

export default MarqueeMessage;