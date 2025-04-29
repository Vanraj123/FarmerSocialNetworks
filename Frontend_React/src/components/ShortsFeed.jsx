// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import './ShortsFeed.css';
// import { useAuth } from '../contexts/AuthContext'; // For role and userId

// const ShortsFeed = () => {
//   const { role, userId } = useAuth(); // Get role and userId of logged-in user
//   const [shorts, setShorts] = useState([]);
//   const videoRefs = useRef([]);

//   const shuffleArray = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   };

//   useEffect(() => {
//     const fetchShorts = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/shorts/all');
//         const shuffledShorts = shuffleArray(response.data);
//         setShorts(shuffledShorts);
//       } catch (error) {
//         console.error('Error fetching shorts:', error);
//       }
//     };

//     fetchShorts();
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const video = entry.target;
//           if (entry.isIntersecting) {
//             video.play().catch((error) => console.error('Error playing video:', error));
//           } else {
//             video.pause();
//           }
//         });
//       },
//       { threshold: 0.5 } // Video needs to be at least 50% visible to start playing
//     );

//     videoRefs.current.forEach((video) => {
//       if (video) observer.observe(video);
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, [shorts]);

//   const handleDelete = async (shortId) => {
//     if (role === 'admin') {
//       try {
//         // Call the backend API to delete the short
//         await axios.delete(`http://localhost:8080/shorts/${shortId}`, {
//           params: { adminId: userId },
//         });
//         // Remove the short from the state
//         setShorts((prevShorts) => prevShorts.filter((short) => short.id !== shortId));
//         alert('Short deleted successfully.');
//       } catch (error) {
//         console.error('Error deleting short:', error);
//         alert('Failed to delete the short. Please try again.');
//       }
//     } else {
//       alert('You do not have permission to delete this short.');
//     }
//   };

//   return (
//     <div className="shorts-feed">
//       {shorts.length > 0 ? (
//         shorts.map((short, index) => (
//           <div key={short.id} className="short-item">
//             <h3>Title: {short.title}</h3>
//             <p>Description: {short.description}</p>
//             <video
//               ref={(el) => (videoRefs.current[index] = el)}
//               className="shorts-video"
//               loop
//               controls // Allows volume control
//               muted={false} // Allows audio to play
//             >
//               <source src={`http://localhost:8080${short.videoPath}`} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             {/* Show delete button below the description for admin users */}
//             {role === 'admin' && (
//               <div className="delete-button-container"> {/* Optional container for styling */}
//                 <button
//                   className="delete-button"
//                   onClick={() => handleDelete(short.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ))
//       ) : (
//         <div className="shorts-feed-empty">
//           <p>No shorts available</p>
//         </div>
//       )}
//     </div>
//   );
// };


// export default ShortsFeed;

// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import './ShortsFeed.css';
// import { useAuth } from '../contexts/AuthContext'; // For role and userId

// const ShortsFeed = () => {
//   const { role, userId } = useAuth(); // Get role and userId of logged-in user
//   const [shorts, setShorts] = useState([]);
//   const videoRefs = useRef([]);

//   const shuffleArray = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   };

//   useEffect(() => {
//     const fetchShorts = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/shorts/all');
//         const shuffledShorts = shuffleArray(response.data);
//         setShorts(shuffledShorts);
//       } catch (error) {
//         console.error('Error fetching shorts:', error);
//       }
//     };

//     fetchShorts();
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const video = entry.target;
//           if (entry.isIntersecting) {
//             video.play().catch((error) => console.error('Error playing video:', error));
//           } else {
//             video.pause();
//           }
//         });
//       },
//       { threshold: 0.5 } // Video needs to be at least 50% visible to start playing
//     );

//     videoRefs.current.forEach((video) => {
//       if (video) observer.observe(video);
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, [shorts]);

//   const handleDelete = async (shortId) => {
//     if (role === 'admin') {
//       try {
//         // Call the backend API to delete the short
//         await axios.delete(`http://localhost:8080/shorts/${shortId}`, {
//           params: { adminId: userId },
//         });
//         // Remove the short from the state
//         setShorts((prevShorts) => prevShorts.filter((short) => short.id !== shortId));
//         alert('Short deleted successfully.');
//       } catch (error) {
//         console.error('Error deleting short:', error);
//         alert('Failed to delete the short. Please try again.');
//       }
//     } else {
//       alert('You do not have permission to delete this short.');
//     }
//   };

//   return (
//     <div className="shorts-feed">
//       {shorts.length > 0 ? (
//         shorts.map((short, index) => (
//           <div key={short.id} className="short-item">
//             <div className="short-text-container">
//               <h3 className="short-title">Title: {short.title}</h3>
//               <p className="short-description">Description: {short.description}</p>
//             </div>
//             <video
//               ref={(el) => (videoRefs.current[index] = el)}
//               className="shorts-video"
//               loop
//               controls // Allows volume control
//               muted={false} // Allows audio to play
//             >
//               <source src={`http://localhost:8080${short.videoPath}`} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             {/* Show delete button below the description for admin users */}
//             {role === 'admin' && (
//               <div className="delete-button-container">
//                 <button className="delete-button" onClick={() => handleDelete(short.id)}>
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ))
//       ) : (
//         <div className="shorts-feed-empty">
//           <p>No shorts available</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShortsFeed;


// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import './ShortsFeed.css';
// import { useAuth } from '../contexts/AuthContext'; // Get user info

// const ShortsFeed = () => {
//   const { role, userId } = useAuth(); // Get role and userId of logged-in user
//   const [shorts, setShorts] = useState([]);
//   const videoRefs = useRef([]);

//   useEffect(() => {
//     const fetchShorts = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/shorts/all');
//         setShorts(response.data);
//       } catch (error) {
//         console.error('Error fetching shorts:', error);
//       }
//     };

//     fetchShorts();
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const video = entry.target;
//           if (entry.isIntersecting) {
//             video.play().catch((error) => console.error('Error playing video:', error));
//           } else {
//             video.pause();
//           }
//         });
//       },
//       { threshold: 0.5 }
//     );

//     videoRefs.current.forEach((video) => {
//       if (video) observer.observe(video);
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, [shorts]);

//   const handleDelete = async (shortId) => {
//     try {
//       await axios.delete(`http://localhost:8080/shorts/${shortId}`, {
//         params: { userId: userId }, // Pass the logged-in user's ID
//       });
//       setShorts((prevShorts) => prevShorts.filter((short) => short.id !== shortId));
//       alert('Short deleted successfully.');
//     } catch (error) {
//       console.error('Error deleting short:', error);
//       alert('Failed to delete the short. Please try again.');
//     }
//   };

//   return (
//     <div className="shorts-feed">
//       {shorts.length > 0 ? (
//         shorts.map((short, index) => (
//           <div key={short.id} className="short-item">
//             <div className="short-text-container">
//               <h3 className="short-title">Title: {short.title}</h3>
//               <p className="short-description">Description: {short.description}</p>
//               {/* Delete button BELOW the description, aligned to the left */}
//               {(role === 'admin' || short.uploadedBy.id === userId) && (
//                 <button className="delete-button" onClick={() => handleDelete(short.id)}>
//                   Delete
//                 </button>
//               )}
//             </div>
//             <video
//               ref={(el) => (videoRefs.current[index] = el)}
//               className="shorts-video"
//               loop
//               controls
//               muted={false}
//             >
//               <source src={`http://localhost:8080${short.videoPath}`} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         ))
//       ) : (
//         <div className="shorts-feed-empty">
//           <p>No shorts available</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShortsFeed;

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './ShortsFeed.css';
import { useAuth } from '../contexts/AuthContext';

const ShortsFeed = () => {
  const { role, userId } = useAuth();
  const [shorts, setShorts] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/shorts/all');
        setShorts(response.data);
      } catch (error) {
        console.error('Error fetching shorts:', error);
      }
    };
    fetchShorts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch((error) => console.error('Error playing video:', error));
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, [shorts]);

  const formatText = (text) => {
    return text.split(' ').reduce((acc, word, index) => {
      return acc + word + (index % 4 === 3 ? '\n' : ' ');
    }, '').trim();
  };

  const handleDelete = async (shortId) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this short!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/shorts/${shortId}`, {
          params: { userId: userId },
        });
        setShorts((prevShorts) => prevShorts.filter((short) => short.id !== shortId));
        Swal.fire('Deleted!', 'Your short has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting short:', error);
        Swal.fire('Error!', 'Failed to delete the short. Please try again.', 'error');
      }
    }
  };

  return (
    <div className="shorts-feed">
      {shorts.length > 0 ? (
        shorts.map((short, index) => (
          <div key={short.id} className="short-item">
            <div className="short-text-container">
              <h3 className="short-title">{formatText(short.title)}</h3>
              <p className="short-description">{formatText(short.description)}</p>
              {(role === 'admin' || short.uploadedBy.id === userId) && (
                <button className="delete-button" onClick={() => handleDelete(short.id)}>
                  Delete
                </button>
              )}
            </div>
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="shorts-video"
              loop
              controls
              muted={false}
            >
              <source src={`http://localhost:8080${short.videoPath}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))
      ) : (
        <div className="shorts-feed-empty">
          <p>No shorts available</p>
        </div>
      )}
    </div>
  );
};

export default ShortsFeed;