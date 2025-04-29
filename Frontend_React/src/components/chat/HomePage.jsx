import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import ChatScreen from './ChatScreen';
import { useAuth } from "../../contexts/AuthContext";
import './HomePage.css';

const Home = () => {
  const location = useLocation();
  const { userId, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: localStorage.getItem('username'),
    password: localStorage.getItem('password'),
  });

  const loginUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const responseData = await res.json();
      console.log(responseData);
      const { token, user } = responseData;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("email", user.email);
      localStorage.setItem("password", userData.password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Call loginUser whenever page reloads or route changes
  useEffect(() => {
    console.log("start");
    loginUser();
  }, [location.key]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  const onContactClick = (contact) => {
    setSelectedItem(contact);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="home-container">
      {/* Mobile Toggle Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar with overlay for mobile */}
      <div className={`sidebar-container ${isSidebarOpen ? 'active' : ''}`}>
        <SideBar onContactClick={onContactClick} />
      </div>
      
      {/* Mobile overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Chat Area */}
      <div className="chat-area-container">
        <ChatScreen
          receiverName={selectedItem ? (selectedItem.type === 'group' ? selectedItem.name : selectedItem.receiver.username) : ''}
          receiverId={selectedItem ? (selectedItem.type === 'group' ? selectedItem._id : selectedItem.receiver._id) : null}
          receiverProfilePicture={selectedItem ? (selectedItem.type === 'group' ? null : `http://localhost:5000${selectedItem.receiver.profilePicture}`) : ''}
          isGroupChat={selectedItem ? (selectedItem.type === 'group') : false}
        />
      </div>
    </div>
  );
};

export default Home;