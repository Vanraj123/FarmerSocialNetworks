import React, { useState, useEffect } from 'react';
import ContactList from './ContactList';
import SearchBar from './SearchBar';
import { io } from 'socket.io-client';
import '../chat/SideBar.css';

const SideBar = ({ onContactClick }) => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newContactUsername, setNewContactUsername] = useState('');
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [newGroupCode, setNewGroupCode] = useState('');
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchContacts();

    const socket = io(`http://localhost:5000`);
    const userId = localStorage.getItem('userId');

    if (userId) {
      socket.emit('joinRoom', { userId });
    }

    socket.on('new-contact', fetchContacts);
    socket.on('group-created', (newGroup) => {
      setContacts(prevContacts => [...prevContacts, { ...newGroup, type: 'group' }]);
      setFilteredContacts(prevFilteredContacts => [...prevFilteredContacts, { ...newGroup, type: 'group' }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const response = await fetch(`http://localhost:5000/api/user/${userId}/contactsAndGroups`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch contacts and groups');
      const data = await response.json();

      const combinedData = [
        ...data.contacts.map(contact => ({ ...contact, type: 'contact' })),
        ...data.groups.map(group => ({ ...group, type: 'group' }))
      ];
      setContacts(combinedData);
      setFilteredContacts(combinedData);
    } catch (err) {
      console.error(err);
      setErrorMessage('An error occurred while fetching contacts');
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filtered = contacts.filter((item) => {
      // Safely filter contacts and groups
      if (item.type === 'contact') {
        return item.receiver?.username?.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return item.name?.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });
    setFilteredContacts(filtered);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setErrorMessage('');
  };

  const handleSubmitNewContact = async () => {
    if (isNewGroup) {
      if (!newGroupCode) return;
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:5000/api/group/groupcode/${newGroupCode}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          setErrorMessage('No group exists');
          return;
        }

        const group = await response.json();
        const groupId = group._id;

        if (group.participant.includes(userId)) {
          setErrorMessage('You are already in the group');
          return;
        }

        const resGroup = await fetch(`http://localhost:5000/api/group/${newGroupCode}/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (resGroup.ok) {
          fetchContacts();
          setNewGroupCode('');
          setShowModal(false);
          setErrorMessage('');
        } else {
          setErrorMessage('Error adding group');
        }
      } catch (error) {
        setErrorMessage('Error adding new group');
        console.error(error);
      }
    } else {
      if (!newContactUsername) return;
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const response = await fetch(`http://localhost:5000/api/user/getUserByUsername/${newContactUsername}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          setErrorMessage('Failed to find user by username');
          return;
        }

        const contactUser = await response.json();
        const contactId = contactUser._id;

        const createContactResponse = await fetch(`http://localhost:5000/api/user/contactBetween/${userId}/${contactId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (createContactResponse.ok) {
          fetchContacts();
          setNewContactUsername('');
          setShowModal(false);
          setErrorMessage('');
        } else {
          setErrorMessage('Error adding contact');
        }
      } catch (error) {
        setErrorMessage('Error adding new contact');
        console.error(error);
      }
    }
  };

  const handleContactClick = (item) => {
    // Safely set the selected contact ID
    const contactId = item.type === 'contact' 
      ? item.receiver?._id 
      : item._id;

    if (contactId) {
      setSelectedContactId(contactId);
      onContactClick(item);
    }
  };

  return (
    <div className="sidebar">
      <SearchBar onSearch={handleSearch} />

      <div className="sidebar-header">
        <h2>My Contacts</h2>
        <button className="add-button" onClick={toggleModal}>+</button>
      </div>

      {filteredContacts.length > 0 ? (
        <ContactList
          contacts={filteredContacts}
          onContactClick={handleContactClick}
          selectedContactId={selectedContactId}
        />
      ) : (
        <div className="no-contacts">
          <p>No contacts found</p>
        </div>
      )}

      {showModal && (
        <div key={showModal} className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add {isNewGroup ? 'Group' : 'Contact'}</h2>
            </div>

            {/* <div className="toggle-container">
              <span>Contact</span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={isNewGroup}
                  onChange={() => {
                    setIsNewGroup((prev) => {
                      console.log("Toggle changed from:", prev, "to", !prev);
                      return !prev;
                    });
                    setErrorMessage('');
                    setNewContactUsername('');
                    setNewGroupCode('');
                  }}
                />
                <div className="toggle-slider"></div>
              </label>
              <span>Group</span>
            </div> */}

            <input
              className="modal-input"
              type="text"
              placeholder={isNewGroup ? "Enter Group code" : "Enter username"}
              value={isNewGroup ? newGroupCode : newContactUsername}
              onChange={(e) => isNewGroup ? setNewGroupCode(e.target.value) : setNewContactUsername(e.target.value)}
            />

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="modal-buttons">
              <button className="modal-button cancel-button" onClick={toggleModal}>
                Cancel
              </button>
              <button className="modal-button submit-button" onClick={handleSubmitNewContact}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
