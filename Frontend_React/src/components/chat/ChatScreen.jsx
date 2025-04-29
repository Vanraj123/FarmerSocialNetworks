import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import UserProfile from '../UserProfile';
// import GroupInfo from './GroupInfo';
import '../chat/ChatScreen.css';

const socket = io("http://localhost:5000"); // Replace with your actual server URL

const ChatScreen = ({ receiverName, receiverId, receiverProfilePicture, isGroupChat }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [senderId, setSenderId] = useState(localStorage.getItem('userId'));
    const [isLoading, setIsLoading] = useState(false);
    const lastMessageRef = useRef(null);

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (userId && receiverId) {
            setSenderId(userId);
            setIsLoading(true);

            if (isGroupChat) {
                socket.emit('joinRoom', { groupId: receiverId });
            } else {
                socket.emit('joinRoom', { userId });
                socket.emit('joinRoom', { userId: receiverId });
            }

            const fetchMessages = async () => {
                try {
                    let response;
                    if (isGroupChat) {
                        response = await axios.get(`http://localhost:5000/api/msg/group/${receiverId}`);
                    } else {
                        const response1 = await axios.get(`http://localhost:5000/api/msg/directMsgBetween/${senderId}/${receiverId}`);
                        const response2 = await axios.get(`http://localhost:5000/api/msg/directMsgBetween/${receiverId}/${senderId}`);
                        response = [...response1.data, ...response2.data];
                    }

                    const uniqueMessages = response.filter((value, index, self) => 
                        index === self.findIndex((t) => t._id === value._id)
                    );
                    setMessages(uniqueMessages);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchMessages();
        }

        const messageHandler = (messageData) => {
            setMessages((prevMessages) => {
                if (!prevMessages.some(msg => msg._id === messageData._id)) {
                    return [...prevMessages, messageData];
                }
                return prevMessages;
            });
        };

        socket.on('receiveMessage', messageHandler);

        return () => {
            socket.off('receiveMessage', messageHandler);

            if (isGroupChat) {
                socket.emit('leaveRoom', { groupId: receiverId });
            } else {
                socket.emit('leaveRoom', { userId: receiverId });
            }
        };
    }, [receiverId, isGroupChat]);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            const messageData = {
                content: newMessage,
                sender: senderId,
                receiver: isGroupChat ? null : receiverId,
                isDirectMsg: !isGroupChat,
                group: isGroupChat ? receiverId : null,
                type: 'msg',
                timestamp: Date.now()
            };

            try {
                const response = await axios.post(`http://localhost:5000/api/msg/`, messageData);

                if (response.status === 201) {
                    socket.emit('sendMessage', response.data);
                    setMessages((prevMessages) => [...prevMessages, response.data]);
                    setNewMessage('');
                } else {
                    console.error('Failed to save the message');
                }
            } catch (error) {
                console.error('Error saving the message:', error);
            }
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                {receiverName && !isGroupChat && (
                    <div className="user-logo">
                        {receiverName.charAt(0).toUpperCase()}
                    </div>
                )}
                <h2>{receiverName}</h2>
                {/* {isGroupChat && <GroupInfo groupId={receiverId} />} */}
            </div>

    
            {!receiverId ? (
                <div className="empty-state">
                    <h1>Select a contact to start chatting</h1>
                </div>
            ) : isLoading ? (
                <div className="loading-state">
                    <h1>Loading...</h1>
                </div>
            ) : (
                <>
                    <div className="messages-container">
                        <div className="messages-wrapper">
                            {messages
                                .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
                                .map((msg, index) => (
                                    <div 
                                        key={index} 
                                        ref={index === messages.length - 1 ? lastMessageRef : null}
                                        className={`message-bubble ${msg.sender._id === senderId ? 'sent' : 'received'}`}
                                    >
                                        {msg.sender._id !== senderId && isGroupChat && (
                                            <div className="sender-name">
                                                {msg.sender.username || 'Unknown'}
                                            </div>
                                        )}
                                        <div className="message-content">
                                            <p>{msg.content}</p>
                                        </div>
                                        <span className="message-time">
                                            {new Date(msg.timestamp).toLocaleTimeString([], { 
                                                hour: '2-digit', 
                                                minute: '2-digit' 
                                            })}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
    
                    <div className="input-container">
                        <input
                            type="text"
                            className="message-input"
                            placeholder="Enter a Message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button className="send-button" onClick={handleSendMessage}>
                            ➤
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ChatScreen;
