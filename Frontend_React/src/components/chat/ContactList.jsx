import React from 'react';
import '../chat/ContactList.css';

// const ContactList = ({ contacts, onContactClick, selectedContactId }) => {
//   return (
//     <div className="contacts-container">
//       <ul className="contacts-list">
//         {contacts.map((item) => {
//           const isSelected = selectedContactId === (item.type === 'contact' ? item.receiver._id : item._id);

//           return (
//             <li
//               key={item.type === 'contact' ? item.receiver._id : item._id}
//               className={`contact-item ${isSelected ? 'selected' : ''}`}
//               onClick={() => onContactClick(item)}
//             >
//               {item.type === 'contact' ? (
//                 <div className="contact-content">
//                   <div className="avatar-container">
//                     <div className="avatar">
//                       {item.receiver.profilePicture ? (
//                         <img src={item.receiver.profilePicture} alt={item.receiver.username} />
//                       ) : (
//                         item.receiver.username.charAt(0).toUpperCase()
//                       )}
//                       <span className={`status-indicator ${item.receiver.isOnline ? 'status-online' : 'status-offline'}`} />
//                     </div>
//                   </div>
//                   <div className="contact-details">
//                     <p className="contact-name">{item.receiver.username}</p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="contact-content">
//                   <div className="group-icon">
//                     👥
//                   </div>
//                   <div className="contact-details">
//                     <p className="group-name">{item.name}</p>
//                   </div>
//                 </div>
//               )}
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

const ContactList = ({ contacts = [], onContactClick, selectedContactId }) => {
  return (
    <div className="contacts-container">
      <ul className="contacts-list">
        {contacts.length > 0 ? (
          contacts.map((item) => {
            // Safely get the ID
            const itemId = item.type === 'contact' 
              ? item.receiver?._id || null 
              : item._id || null;

            // Safely check selection
            const isSelected = selectedContactId && itemId 
              ? selectedContactId === itemId 
              : false;

            return (
              itemId && (
                <li
                  key={itemId}
                  className={`contact-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => onContactClick(item)}
                >
                  {item.type === 'contact' ? (
                    <div className="contact-content">
                      <div className="avatar-container">
                        <div className="avatar">
                          {item.receiver?.profilePicture ? (
                            <img src={item.receiver.profilePicture} alt={item.receiver.username} />
                          ) : (
                            item.receiver?.username?.charAt(0)?.toUpperCase() || 'U'
                          )}
                          <span className={`status-indicator ${item.receiver?.isOnline ? 'status-online' : 'status-offline'}`} />
                        </div>
                      </div>
                      <div className="contact-details">
                        <p className="contact-name">{item.receiver?.username || 'Unknown'}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="contact-content">
                      <div className="group-icon">
                        👥
                      </div>
                      <div className="contact-details">
                        <p className="group-name">{item.name || 'Unnamed Group'}</p>
                      </div>
                    </div>
                  )}
                </li>
              )
            );
          })
        ) : (
          <p className="no-contacts">No contacts available.</p>
        )}
      </ul>
    </div>
  );
};

export default ContactList;