import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../components/chat/SideBar';
import ChatScreen from '../components/chat/ChatScreen';
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const location = useLocation();
  const { userId, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [userData, setUserData] = useState({
    username: "vanraj123",
    password: "Vanraj_753",
  });

  const loginUser = async () => {
    try {
      console.log("Attempting login with:", userData);

      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        const errorResponse = await res.text();
        console.error("Error response:", errorResponse);
        throw new Error(`Error: ${res.status} - ${errorResponse}`);
      }

      const responseData = await res.json();
      console.log("Login successful, response data:", responseData);

      const { token, user } = responseData;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("email", user.email);
      localStorage.setItem("password", userData.password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (!localStorage.getItem("token")) {
    loginUser();
  }

  if (!user) {
    navigate('/login');
  }

  const onContactClick = (contact) => {
    setSelectedItem(contact);
    console.log(contact);
  };

  return (
    <div>
      <SideBar onContactClick={onContactClick} />
      <ChatScreen
        receiverName={selectedItem ? (selectedItem.type === 'group' ? selectedItem.name : selectedItem.receiver.username) : ''}
        receiverId={selectedItem ? (selectedItem.type === 'group' ? selectedItem._id : selectedItem.receiver._id) : null}
        receiverProfilePicture={selectedItem ? (selectedItem.type === 'group' ? null : `http://localhost:5000${selectedItem.receiver.profilePicture}`) : ''}
        isGroupChat={selectedItem ? (selectedItem.type === 'group') : false}
      />
    </div>
  );
};

export default Home;