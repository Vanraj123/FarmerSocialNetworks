// import React, { useEffect, useState } from 'react';
// import './PostSectionComponent.css';
// import PostService from '../services/PostService';
// import { useAuth } from '../contexts/AuthContext';
// import { MoreVertical, Trash2, Heart, MessageCircle, Share2 } from 'lucide-react';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import CommentService from '../services/CommentService'; // New service for handling comments

// const PostSectionComponent = () => {
//     const [posts, setPosts] = useState([]);
//     const [userProfiles, setUserProfiles] = useState({});
//     const [filterByUser, setFilterByUser] = useState(false);
//     const [filterByLiked, setFilterByLiked] = useState(false);
//     const [filterOption, setFilterOption] = useState('All Posts');
//     const [comments, setComments] = useState({}); // Store comments for each post
//     const [newComment, setNewComment] = useState(''); // Store new comment input
//     const [activePostId, setActivePostId] = useState(null);
//     const [filterMyComments, setFilterMyComments] = useState(false); // State for filtering comments


//     const { userId, user, isLoading } = useAuth();
//     const navigate = useNavigate();

//     const filteredComments = filterMyComments
//   ? comments.filter((comment) => comment.userId === userId) // Show only user's comments
//   : comments; // Show all comments


//     useEffect(() => {
//         if (!isLoading && !user) {
//             navigate('/login');
//         }
//     }, [isLoading, user, navigate]);

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const response = await PostService.getAllPosts();
//                 const fetchedPosts = response.data;

//                 // Add isLiked property for each post by calling the backend
//                 const postsWithLikes = await Promise.all(
//                     fetchedPosts.map(async (post) => {
//                         const isLikedResponse = await PostService.isPostLikedByUser(post.id, userId);
//                         return { ...post, isLiked: isLikedResponse.data }; // Use backend response
//                     })
//                 );

//                 setPosts(postsWithLikes);

//                 // Fetch user profiles for all posts
//                 const uniqueUserIds = [...new Set(fetchedPosts.map((post) => post.userId))];
//                 const userProfilesData = {};
//                 for (const id of uniqueUserIds) {
//                     const userResponse = await PostService.getUserById(id);
//                     userProfilesData[id] = userResponse.data;
//                 }
//                 setUserProfiles(userProfilesData);
//             } catch (error) {
//                 console.error('Error fetching posts:', error);
//             }
//         };

//         if (userId) fetchPosts();
//     }, [userId]);

//     const fetchComments = async (postId) => {
//         if (activePostId === postId) {
//             setActivePostId(null);
//             return;
//         }

//         try {
//             const response = await CommentService.getCommentsByPostId(postId);
//             console.log(response.data);
//             setComments((prevComments) => ({
//                 ...prevComments,
//                 [postId]: response.data || [],
//             }));
//             setActivePostId(postId);
//         } catch (error) {
//             console.error('Error fetching comments:', error);
//         }
//     };

//     const handleAddComment = async (postId) => {
//         if (!newComment.trim()) return;

//         console.log(newComment);

//         try {
//             const commentData = {
//                 content: newComment,
//                 userId: userId,
//                 postId: postId,
//             };

//             const response = await CommentService.addComment(postId, userId, newComment);
//             console.log(response); // Log the entire response for debugging

//             if (response && response.content && response.timestamp && response.postId) {
//                 setComments((prevComments) => ({
//                     ...prevComments,
//                     [postId]: [...(prevComments[postId] || []), response],
//                 }));
//             } else {
//                 console.error('Unexpected response format:', response);
//             }

//             setNewComment('');
//         } catch (error) {
//             console.error('Error adding comment:', error);
//         }
//     };

//     const handleDeleteComment = async (postId, commentId) => {
//         const result = await Swal.fire({
//             title: 'Delete Comment?',
//             text: 'Are you sure you want to delete this comment?',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#ef4444',
//             cancelButtonColor: '#6b7280',
//             confirmButtonText: 'Yes, delete it!',
//             cancelButtonText: 'Cancel',
//         });

//         if (result.isConfirmed) {
//             try {
//                 console.log(`Attempting to delete comment with id: ${commentId}`); // Debugging log
//                 const response = await CommentService.deleteComment(commentId);
//                 console.log('Delete response:', response); // Debugging log

//                 setComments((prevComments) => ({
//                     ...prevComments,
//                     [postId]: prevComments[postId].filter((comment) => comment.id !== commentId),
//                 }));
//                 Swal.fire('Deleted!', 'Your comment has been deleted.', 'success');
//             } catch (error) {
//                 console.error('Error deleting comment:', error);
//                 Swal.fire('Error!', 'Failed to delete the comment.', 'error');
//             }
//         }
//     };

//     const handleLikeToggle = async (postId) => {
//         try {
//             const post = posts.find((p) => p.id === postId);
//             const isLiked = post.isLiked;

//             // Update like status in backend
//             await PostService.toggleLike(postId, userId);

//             // Update like status and count in state
//             const updatedPosts = posts.map((p) =>
//                 p.id === postId
//                     ? { ...p, isLiked: !isLiked, likes: isLiked ? p.likes - 1 : p.likes + 1 }
//                     : p
//             );
//             setPosts(updatedPosts);
//         } catch (error) {
//             console.error(`Error toggling like for post ${postId}:`, error);
//         }
//     };

//     const handleDelete = async (postId, postTitle) => {
//         const result = await Swal.fire({
//             title: 'Delete Post?',
//             text: `Are you sure you want to delete "${postTitle}"?`,
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#ef4444',
//             cancelButtonColor: '#6b7280',
//             confirmButtonText: 'Yes, delete it!',
//             cancelButtonText: 'Cancel',
//         });

//         if (result.isConfirmed) {
//             try {
//                 await PostService.deletePost(postId);
//                 setPosts(posts.filter((post) => post.id !== postId));
//                 Swal.fire({
//                     title: 'Deleted!',
//                     text: 'Your post has been deleted.',
//                     icon: 'success',
//                     confirmButtonColor: '#28a745', // Green color for the success "OK" button
//                 });
//             } catch (error) {
//                 console.error(`Error deleting post with id ${postId}:`, error);
//                 Swal.fire('Error!', 'Failed to delete the post.', 'error');
//             }
//         }
//     };

//     const formatDate = (timestamp) => {
//         const date = new Date(parseInt(timestamp, 10));
//         return date.toLocaleString();
//     };

//     const handleFilterChange = (option) => {
//         setFilterOption(option);
//         setFilterByUser(option === 'My Posts');
//         setFilterByLiked(option === 'Posts Liked by Me');
//     };

//     const filteredPosts = posts.filter((post) => {
//         if (filterByUser && post.userId !== userId) {
//             return false;
//         }
//         if (filterByLiked && !post.isLiked) {
//             return false;
//         }
//         return true;
//     });

//     return (
//         <div className="post-section">
//             <div className="post-section-header">
//                 <h2>{filterOption}</h2>
//                 <div className="dropdown">
//                     <button className="dropbtn">Your Activity</button>
//                     <div className="dropdown-content">
//                         <button onClick={() => handleFilterChange('All Posts')}>All Posts</button>
//                         <button onClick={() => handleFilterChange('My Posts')}>View My Posts</button>
//                         <button onClick={() => handleFilterChange('Posts Liked by Me')}>View Posts Liked by Me</button>
//                     </div>
//                 </div>
//             </div>
//             {filteredPosts.length > 0 ? (
//                 filteredPosts.map((post) => (
//                     <div key={post.id} className="post-card">
//                         <div className="post-header">
//                             <div className="post-header-left">
//                                 <img
//                                     src={
//                                         userProfiles[post.userId]?.profileImagePath
//                                             ? `http://localhost/uploads/${userProfiles[post.userId]?.profileImagePath}`
//                                             : '/default-profile.png'
//                                     }
//                                     alt={userProfiles[post.userId]?.name || 'User Avatar'}
//                                     className="user-avatar"
//                                 />
//                                 <div className="user-info">
//                                     <h3>{userProfiles[post.userId]?.name || 'Unknown User'}</h3>
//                                     <p className="post-date">{formatDate(post.timestamp)}</p>
//                                 </div>
//                             </div>
    
//                             {(post.userId === userId || user?.role === 'admin') && (
//                                 <div className="post-actions">
//                                     <button
//                                         className="action-button delete-action"
//                                         onClick={() => handleDelete(post.id, post.title)}
//                                         title="Delete post"
//                                     >
//                                         <Trash2 size={20} />
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
    
//                         {post.imagePath && (
//                             <div className="post-image-container">
//                                 <img
//                                     src={post.imagePath}
//                                     alt={post.title}
//                                     className="post-image"
//                                 />
//                             </div>
//                         )}
    
//                         <div className="post-content-wrapper">
//                             <div className="engagement-actions">
//                                 <button
//                                     className={`action-button ${post.isLiked ? 'liked' : ''}`}
//                                     onClick={() => handleLikeToggle(post.id)}
//                                     title={post.isLiked ? 'Unlike' : 'Like'}
//                                 >
//                                     <Heart size={24} style={{ color: post.isLiked ? 'red' : 'inherit' }} />{' '}
//                                     {post.likes}
//                                 </button>
//                                 <button className="action-button" onClick={() => fetchComments(post.id)}>
//                                     <MessageCircle size={24} />
//                                 </button>
//                                 <button className="action-button">
//                                     <Share2 size={24} />
//                                 </button>
//                             </div>
//                             {/* Comment Section */}
//                             {activePostId === post.id && (
//                                 <div className="comment-section">
//                                     <h4>Comments</h4>
//                                     <textarea
//                                         placeholder="Add a comment..."
//                                         value={newComment}
//                                         onChange={(e) => setNewComment(e.target.value)}
//                                     />
//                                     <button onClick={() => handleAddComment(post.id)}>Post Comment</button>
//                                     <div className="comment-slider">
//                                         {comments[post.id]?.length > 0 ? (
//                                             <div className="comment-container">
//                                                 {comments[post.id].map((comment) => (
//                                                     <div key={comment.id} className="comment">
//                                                         <p>
//                                                             <strong>{comment.userName}:</strong> {comment.content}
//                                                         </p>
//                                                         <button
//                                                             className="delete-comment"
//                                                             onClick={() => handleDeleteComment(post.id, comment.id)}
//                                                         >
//                                                             <Trash2 />
//                                                         </button>
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         ) : (
//                                             <p>No comments yet. Be the first to comment!</p>
//                                         )}
//                                     </div>
//                                 </div>
//                             )}
//                             <h3 className="post-title">{post.title}</h3>
//                             <p className="post-content">{post.content}</p>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <p>No posts found. Please check your filters or create a new post.</p>
//             )}
//         </div>
//     );
// }

// export default PostSectionComponent;

// import React, { useEffect, useState } from 'react';
// import './PostSectionComponent.css';
// import PostService from '../services/PostService';
// import { useAuth } from '../contexts/AuthContext';
// import { MoreVertical, Trash2, Heart, MessageCircle, Share2 } from 'lucide-react';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import CommentService from '../services/CommentService'; // New service for handling comments

// const PostSectionComponent = () => {
//     const [posts, setPosts] = useState([]);
//     const [userProfiles, setUserProfiles] = useState({});
//     const [filterByUser, setFilterByUser] = useState(false);
//     const [filterByLiked, setFilterByLiked] = useState(false);
//     const [filterOption, setFilterOption] = useState('All Posts');
//     const [comments, setComments] = useState({}); // Store comments for each post
//     const [newComment, setNewComment] = useState(''); // Store new comment input
//     const [activePostId, setActivePostId] = useState(null);
//     const [filterMyComments, setFilterMyComments] = useState(false); // State for filtering comments
//     const [showMyComments, setShowMyComments] = useState(false);


//     const { userId, user, isLoading } = useAuth();
//     const navigate = useNavigate();

//     const filteredComments = filterMyComments
//         ? comments.filter((comment) => comment.userId === userId) // Show only user's comments
//         : comments; // Show all comments

//     useEffect(() => {
//         if (!isLoading && !user) {
//             navigate('/login');
//         }
//     }, [isLoading, user, navigate]);

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const response = await PostService.getAllPosts();
//                 const fetchedPosts = response.data;

//                 // Add isLiked property for each post by calling the backend
//                 const postsWithLikes = await Promise.all(
//                     fetchedPosts.map(async (post) => {
//                         const isLikedResponse = await PostService.isPostLikedByUser(post.id, userId);
//                         return { ...post, isLiked: isLikedResponse.data }; // Use backend response
//                     })
//                 );

//                 setPosts(postsWithLikes);

//                 // Fetch user profiles for all posts
//                 const uniqueUserIds = [...new Set(fetchedPosts.map((post) => post.userId))];
//                 const userProfilesData = {};
//                 for (const id of uniqueUserIds) {
//                     const userResponse = await PostService.getUserById(id);
//                     userProfilesData[id] = userResponse.data;
//                 }
//                 setUserProfiles(userProfilesData);
//             } catch (error) {
//                 console.error('Error fetching posts:', error);
//             }
//         };

//         if (userId) fetchPosts();
//     }, [userId]);

//     const fetchComments = async (postId) => {
//         if (activePostId === postId) {
//             setActivePostId(null);
//             return;
//         }

//         try {
//             const response = await CommentService.getCommentsByPostId(postId);
//             console.log(response.data);
//             setComments((prevComments) => ({
//                 ...prevComments,
//                 [postId]: response.data || [],
//             }));
//             setActivePostId(postId);
//         } catch (error) {
//             console.error('Error fetching comments:', error);
//         }
//     };

//     const handleAddComment = async (postId) => {
//         if (!newComment.trim()) return;

//         try {
//             const commentData = {
//                 content: newComment,
//                 userId: userId,
//                 postId: postId,
//             };

//             const response = await CommentService.addComment(postId, userId, newComment);
//             if (response && response.content && response.timestamp && response.postId) {
//                 setComments((prevComments) => ({
//                     ...prevComments,
//                     [postId]: [...(prevComments[postId] || []), response],
//                 }));
//             } else {
//                 console.error('Unexpected response format:', response);
//             }

//             setNewComment('');
//         } catch (error) {
//             console.error('Error adding comment:', error);
//         }
//     };

//     const handleDeleteComment = async (postId, commentId) => {
//         const result = await Swal.fire({
//             title: 'Delete Comment?',
//             text: 'Are you sure you want to delete this comment?',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#ef4444',
//             cancelButtonColor: '#6b7280',
//             confirmButtonText: 'Yes, delete it!',
//             cancelButtonText: 'Cancel',
//         });

//         if (result.isConfirmed) {
//             try {
//                 await CommentService.deleteComment(commentId);
//                 setComments((prevComments) => ({
//                     ...prevComments,
//                     [postId]: prevComments[postId].filter((comment) => comment.id !== commentId),
//                 }));
//                 Swal.fire('Deleted!', 'Your comment has been deleted.', 'success');
//             } catch (error) {
//                 console.error('Error deleting comment:', error);
//                 Swal.fire('Error!', 'Failed to delete the comment.', 'error');
//             }
//         }
//     };

//     const handleLikeToggle = async (postId) => {
//         try {
//             const post = posts.find((p) => p.id === postId);
//             const isLiked = post.isLiked;

//             // Update like status in backend
//             await PostService.toggleLike(postId, userId);

//             // Update like status and count in state
//             const updatedPosts = posts.map((p) =>
//                 p.id === postId
//                     ? { ...p, isLiked: !isLiked, likes: isLiked ? p.likes - 1 : p.likes + 1 }
//                     : p
//             );
//             setPosts(updatedPosts);
//         } catch (error) {
//             console.error(`Error toggling like for post ${postId}:`, error);
//         }
//     };

//     const handleDelete = async (postId, postTitle) => {
//         const result = await Swal.fire({
//             title: 'Delete Post?',
//             text: `Are you sure you want to delete "${postTitle}"?`,
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#ef4444',
//             cancelButtonColor: '#6b7280',
//             confirmButtonText: 'Yes, delete it!',
//             cancelButtonText: 'Cancel',
//         });

//         if (result.isConfirmed) {
//             try {
//                 await PostService.deletePost(postId);
//                 setPosts(posts.filter((post) => post.id !== postId));
//                 Swal.fire({
//                     title: 'Deleted!',
//                     text: 'Your post has been deleted.',
//                     icon: 'success',
//                     confirmButtonColor: '#28a745',
//                 });
//             } catch (error) {
//                 console.error(`Error deleting post with id ${postId}:`, error);
//                 Swal.fire('Error!', 'Failed to delete the post.', 'error');
//             }
//         }
//     };

//     const formatDate = (timestamp) => {
//         const date = new Date(parseInt(timestamp, 10));
//         return date.toLocaleString();
//     };

//     const handleFilterChange = (option) => {
//         setFilterOption(option);
//         setFilterByUser(option === 'My Posts');
//         setFilterByLiked(option === 'Posts Liked by Me');
//     };

//     const filteredPosts = posts.filter((post) => {
//         if (filterByUser && post.userId !== userId) {
//             return false;
//         }
//         if (filterByLiked && !post.isLiked) {
//             return false;
//         }
//         return true;
//     });

//     return (
//         <div className="post-section">
//             <div className="post-section-header">
//                 <h2>{filterOption}</h2>
//                 <div className="dropdown">
//                     <button className="dropbtn">Your Activity</button>
//                     <div className="dropdown-content">
//                         <button onClick={() => handleFilterChange('All Posts')}>All Posts</button>
//                         <button onClick={() => handleFilterChange('My Posts')}>View My Posts</button>
//                         <button onClick={() => handleFilterChange('Posts Liked by Me')}>View Posts Liked by Me</button>
//                     </div>
//                 </div>
//             </div>
//             {filteredPosts.length > 0 ? (
//                 filteredPosts.map((post) => (
//                     <div key={post.id} className="post-card">
//                         <div className="post-header">
//                             <div className="post-header-left">
//                                 <img
//                                     src={
//                                         userProfiles[post.userId]?.profileImagePath
//                                             ? `http://localhost/uploads/${userProfiles[post.userId]?.profileImagePath}`
//                                             : '/default-profile.png'
//                                     }
//                                     alt={userProfiles[post.userId]?.name || 'User Avatar'}
//                                     className="user-avatar"
//                                 />
//                                 <div className="user-info">
//                                     <h3>{userProfiles[post.userId]?.name || 'Unknown User'}</h3>
//                                     <p className="post-date">{formatDate(post.timestamp)}</p>
//                                 </div>
//                             </div>
    
//                             {(post.userId === userId || user?.role === 'admin') && (
//                                 <div className="post-actions">
//                                     <button
//                                         className="action-button delete-action"
//                                         onClick={() => handleDelete(post.id, post.title)}
//                                         title="Delete post"
//                                     >
//                                         <Trash2 size={20} />
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
    
//                         {post.imagePath && (
//                             <div className="post-image-container">
//                                 <img
//                                     src={post.imagePath}
//                                     alt={post.title}
//                                     className="post-image"
//                                 />
//                             </div>
//                         )}
    
//                         {/* Comments Section (Visible first) */}
//                         <div className="post-footer">
//                             <div className="post-actions">
//                                 <button
//                                     className={`action-button like-button ${
//                                         post.isLiked ? 'liked' : ''
//                                     }`}
//                                     onClick={() => handleLikeToggle(post.id)}
//                                 >
//                                     <Heart size={20} /> {post.likes || 0}
//                                 </button>
//                                 <button
//                                     className="action-button comment-button"
//                                     onClick={() => fetchComments(post.id)}
//                                 >
//                                     <MessageCircle size={20} />
//                                     <span className="comment-count">
//                                         {comments[post.id]?.length || 0}
//                                     </span>
//                                 </button>
//                                 <button
//                                     className="action-button share-button"
//                                     title="Share post"
//                                 >
//                                     <Share2 size={20} />
//                                 </button>
//                             </div>
//                         </div>
    
//                         {activePostId === post.id && (
//                             <div className="comments-section">
//                                 <h4>Comments:</h4>

//                                 {/* Toggle Button for My Comments */}
//                                 <button
//                                     className="action-button filter-my-comments"
//                                     onClick={() => setShowMyComments((prev) => !prev)}
//                                 >
//                                     {showMyComments ? "Show All Comments" : "Show My Comments"}
//                                 </button>

//                                 <ul>
//                                     {comments[post.id]?.length > 0 ? (
//                                         comments[post.id]
//                                             .filter((comment) => !showMyComments || comment.userId === userId) // Filter Logic
//                                             .map((comment) => (
//                                                 <li key={comment.id}>
//                                                     <p className="comment-content">{comment.content}</p>
//                                                     <small className="comment-info">
//                                                         <b>Posted by: </b>
//                                                         {comment.userId === userId
//                                                             ? "You"
//                                                             : userProfiles[comment.userId]?.name || "Unknown User"}{" "}
//                                                         on {formatDate(comment.timestamp)}
//                                                     </small>
//                                                     {comment.userId === userId && (
//                                                         <button
//                                                             className="action-button delete-comment-button"
//                                                             onClick={() =>
//                                                                 handleDeleteComment(post.id, comment.id)
//                                                             }
//                                                             title="Delete comment"
//                                                         >
//                                                             <Trash2 size={16} />
//                                                         </button>
//                                                     )}
//                                                 </li>
//                                             ))
//                                     ) : (
//                                         <p>No comments yet. Be the first to comment!</p>
//                                     )}
//                                 </ul>
//                                 <div className="comment-input">
//                                     <input
//                                         type="text"
//                                         placeholder="Write a comment..."
//                                         value={newComment}
//                                         onChange={(e) => setNewComment(e.target.value)}
//                                     />
//                                     <button onClick={() => handleAddComment(post.id)}>Post</button>
//                                 </div>
//                             </div>
//                         )}

    
//                         {/* Post title and content (Visible below) */}
//                         <h3 className="post-title">{post.title}</h3>
//                         <p className="post-content">{post.content}</p>
//                     </div>
//                 ))
//             ) : (
//                 <p>No posts available.</p>
//             )}
//         </div>
//     );
// };

// export default PostSectionComponent;








import React, { useEffect, useState } from 'react';
import './PostSectionComponent.css';
import PostService from '../services/PostService';
import { useAuth } from '../contexts/AuthContext';
import { MoreVertical, Trash2, Heart, MessageCircle, Share2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import CommentService from '../services/CommentService'; // New service for handling comments
import VerifiedBadge from '../assets/verified.png';

const PostSectionComponent = () => {
    const [posts, setPosts] = useState([]);
    const [userProfiles, setUserProfiles] = useState({});
    const [filterByUser, setFilterByUser] = useState(false);
    const [filterByLiked, setFilterByLiked] = useState(false);
    const [filterOption, setFilterOption] = useState('All Posts');
    const [comments, setComments] = useState({}); // Store comments for each post
    const [newComment, setNewComment] = useState(''); // Store new comment input
    const [activePostId, setActivePostId] = useState(null);
    const [filterMyComments, setFilterMyComments] = useState(false); // State for filtering comments
    const [showMyComments, setShowMyComments] = useState(false);


    const { userId, user, isLoading } = useAuth();
    const navigate = useNavigate();

    const filteredComments = filterMyComments
        ? comments.filter((comment) => comment.userId === userId) // Show only user's comments
        : comments; // Show all comments

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/login');
        }
    }, [isLoading, user, navigate]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await PostService.getAllPosts();
                const fetchedPosts = response.data;

                // Add isLiked property for each post by calling the backend
                const postsWithLikes = await Promise.all(
                    fetchedPosts.map(async (post) => {
                        const isLikedResponse = await PostService.isPostLikedByUser(post.id, userId);
                        return { ...post, isLiked: isLikedResponse.data }; // Use backend response
                    })
                );
                // Sort posts by timestamp (newest first)
                const sortedPosts = postsWithLikes.sort((a, b) => 
                    parseInt(b.timestamp) - parseInt(a.timestamp)
                );
                setPosts(postsWithLikes);

                // Fetch user profiles for all posts
                const uniqueUserIds = [...new Set(fetchedPosts.map((post) => post.userId))];
                const userProfilesData = {};
                for (const id of uniqueUserIds) {
                    const userResponse = await PostService.getUserById(id);
                    userProfilesData[id] = userResponse.data;
                }
                setUserProfiles(userProfilesData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        if (userId) fetchPosts();
    }, [userId]);

    const fetchComments = async (postId) => {
        if (activePostId === postId) {
            setActivePostId(null);
            return;
        }
    
        try {
            const response = await CommentService.getCommentsByPostId(postId);
            
            if (!response.data || response.data.length === 0) {
                // No comments found, update state with an empty array
                setComments((prevComments) => ({
                    ...prevComments,
                    [postId]: [],
                }));
                setActivePostId(postId);
                return;
            }
    
            const commentsWithUserInfo = await Promise.all(
                response.data.map(async (comment) => {
                    try {
                        const userResponse = await PostService.getUserById(comment.userId);
                        return {
                            ...comment,
                            userName: userResponse.data.name || "Unknown User",
                            userRole: userResponse.data.role, // Get role to check if it's 'agronomist'
                            profileImage: userResponse.data.profileImagePath || "/default-profile.png",
                        };
                    } catch (userError) {
                        console.error('Error fetching user data:', userError);
                        return {
                            ...comment,
                            userName: "Unknown User",
                            userRole: "user",
                            profileImage: "/default-profile.png",
                        };
                    }
                })
            );
    
            setComments((prevComments) => ({
                ...prevComments,
                [postId]: commentsWithUserInfo,
            }));
            setActivePostId(postId);
        } catch (error) {
            console.error("Error fetching comments:", error);
            // Handle error by setting an empty array for the post's comments
            setComments((prevComments) => ({
                ...prevComments,
                [postId]: [],
            }));
        }
    };
    
    

    const handleAddComment = async (postId) => {
        if (!newComment.trim()) return;

        try {
            const commentData = {
                content: newComment,
                userId: userId,
                postId: postId,
            };

            const response = await CommentService.addComment(postId, userId, newComment);
            if (response && response.content && response.timestamp && response.postId) {
                setComments((prevComments) => ({
                    ...prevComments,
                    [postId]: [...(prevComments[postId] || []), response],
                }));
            } else {
                console.error('Unexpected response format:', response);
            }

            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteComment = async (postId, commentId) => {
        const result = await Swal.fire({
            title: 'Delete Comment?',
            text: 'Are you sure you want to delete this comment?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                await CommentService.deleteComment(commentId);
                setComments((prevComments) => ({
                    ...prevComments,
                    [postId]: prevComments[postId].filter((comment) => comment.id !== commentId),
                }));
                Swal.fire('Deleted!', 'Your comment has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting comment:', error);
                Swal.fire('Error!', 'Failed to delete the comment.', 'error');
            }
        }
    };

    const handleLikeToggle = async (postId) => {
        try {
            const post = posts.find((p) => p.id === postId);
            const isLiked = post.isLiked;

            // Update like status in backend
            await PostService.toggleLike(postId, userId);

            // Update like status and count in state
            const updatedPosts = posts.map((p) =>
                p.id === postId
                    ? { ...p, isLiked: !isLiked, likes: isLiked ? p.likes - 1 : p.likes + 1 }
                    : p
            );
            setPosts(updatedPosts);
        } catch (error) {
            console.error(`Error toggling like for post ${postId}:`, error);
        }
    };

    const handleDelete = async (postId, postTitle) => {
        const result = await Swal.fire({
            title: 'Delete Post?',
            text: `Are you sure you want to delete "${postTitle}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                await PostService.deletePost(postId);
                setPosts(posts.filter((post) => post.id !== postId));
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your post has been deleted.',
                    icon: 'success',
                    confirmButtonColor: '#28a745',
                });
            } catch (error) {
                console.error(`Error deleting post with id ${postId}:`, error);
                Swal.fire('Error!', 'Failed to delete the post.', 'error');
            }
        }
    };

    const formatDate = (timestamp) => {
        const date = new Date(parseInt(timestamp, 10));
        return date.toLocaleString();
    };

    const handleFilterChange = (option) => {
        setFilterOption(option);
        setFilterByUser(option === 'My Posts');
        setFilterByLiked(option === 'Posts Liked by Me');
    };

    const filteredPosts = posts.filter((post) => {
        if (filterByUser && post.userId !== userId) {
            return false;
        }
        if (filterByLiked && !post.isLiked) {
            return false;
        }
        return true;
    });

    return (
        <div className="post-section">
    <div className="post-section-header">
        <h2>{filterOption}</h2>
        <div className="dropdown">
            <button className="dropbtn">Your Activity</button>
            <div className="dropdown-content">
                <button onClick={() => handleFilterChange('All Posts')}>All Posts</button>
                <button onClick={() => handleFilterChange('My Posts')}>View My Posts</button>
                <button onClick={() => handleFilterChange('Posts Liked by Me')}>View Posts Liked by Me</button>
            </div>
        </div>
    </div>

    {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
                <div className="post-header">
                    <div className="post-header-left">
                        <img
                            src={
                                userProfiles[post.userId]?.profileImagePath
                                    ? `http://localhost/uploads/${userProfiles[post.userId]?.profileImagePath}`
                                    : "/default-profile.png"
                            }
                            alt={userProfiles[post.userId]?.name || "User Avatar"}
                            className="user-avatar"
                        />
                        <div className="user-info">
                            <h3>
                                {userProfiles[post.userId]?.name || "Unknown User"}{" "}
                                {userProfiles[post.userId]?.role === "agronomist" && (
                                    <img src={VerifiedBadge} alt="Verified" className="blue-tick" />
                                )}
                            </h3>
                            <p className="post-date">{formatDate(post.timestamp)}</p>
                        </div>
                    </div>

                    {(post.userId === userId || user?.role === 'admin') && (
                        <div className="post-actions">
                            <button
                                className="action-button delete-action"
                                onClick={() => handleDelete(post.id, post.title)}
                                title="Delete post"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {post.imagePath && (
                    <div className="post-image-container">
                        <img
                            src={post.imagePath}
                            alt={post.title}
                            className="post-image"
                        />
                    </div>
                )}

                {/* Post title and content */}
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{post.content}</p>

                {/* Post Footer with Like, Comment, and Share Buttons */}
                <div className="post-footer">
                    <div className="post-actions">
                        <button
                            className={`action-button like-button ${post.isLiked ? 'liked' : ''}`}
                            onClick={() => handleLikeToggle(post.id)}
                        >
                            <Heart size={20} /> {post.likes || 0}
                        </button>
                        <button
                            className="action-button comment-button"
                            onClick={() => fetchComments(post.id)}
                        >
                            <MessageCircle size={20} />
                            <span className="comment-count">{comments[post.id]?.length || 0}</span>
                        </button>
                        <button
                            className="action-button share-button"
                            title="Share post"
                        >
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>

                {/* Comments Section */}
                {activePostId === post.id && (
                    <div className="comments-section">
                        <h4>Comments:</h4>
                        
                        {/* Toggle Button for My Comments */}
                        <button
                            className="action-button filter-my-comments"
                            onClick={() => setShowMyComments((prev) => !prev)}
                        >
                            {showMyComments ? "Show All Comments" : "Show My Comments"}
                        </button>

                        <ul>
                            {comments[post.id]?.length > 0 ? (
                                comments[post.id]
                                    .filter((comment) => !showMyComments || comment.userId === userId) // Filter Logic
                                    .map((comment) => (
                                        <li key={comment.id} className="comment">
                                            <div className="comment-header">
                                                <div className="comment-info">
                                                    <h4>
                                                        {comment.userId === userId ? "You" : comment.userName || "Unknown User"}
                                                        {comment.userRole === 'agronomist' && (
                                                             <img src={VerifiedBadge} alt="Verified" className="blue-tick" />
                                                        )}
                                                    </h4>
                                                    <p className="comment-timestamp">on {formatDate(comment.timestamp)}</p>
                                                </div>
                                            </div>
                                            <p className="comment-content">{comment.content}</p>
                                            {(comment.userId === userId || user?.role === "admin") && (
                                                <button
                                                    className="action-button delete-comment-button"
                                                    onClick={() => handleDeleteComment(post.id, comment.id)}
                                                    title="Delete comment"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </li>
                                    ))
                            ) : (
                                <p>No comments yet. Be the first to comment!</p>
                            )}
                        </ul>

                        {/* Comment Input */}
                        <div className="comment-input">
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button onClick={() => handleAddComment(post.id)}>Post</button>
                        </div>
                    </div>
                )}
            </div>
        ))
    ) : (
        <p>No posts available.</p>
    )}
</div>
    );
};

export default PostSectionComponent;