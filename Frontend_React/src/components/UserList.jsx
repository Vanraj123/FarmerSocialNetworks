import React from 'react';
import UserDetail from './UserDetail';
import './UserList.css';

const UserList = ({ users, onDelete }) => {
    return (
        <div className="user-list">
            <h3>User List</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <UserDetail user={user} onDelete={onDelete} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
