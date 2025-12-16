import React, { useState, useEffect } from "react";
import "./FeedPage.css";

// const dummyPosts = [
//   { id: 1, userId: 1, title: "AI", body: "Artificial Intelligence (AI) is transforming the way we live and work, offering unprecedented opportunities for innovation and efficiency. From smart assistants that simplify daily tasks to advanced algorithms that drive breakthroughs in healthcare, finance, and education, AI is reshaping industries at a remarkable pace. By analyzing vast amounts of data, AI systems can identify patterns, make predictions, and even generate creative content, enabling businesses and individuals to make smarter decisions. While the potential of AI is immense, it also raises important questions about ethics, privacy, and the future of work—making it essential for society to embrace AI responsibly and thoughtfully." },
//   { id: 2, userId: 1, title: "ML", body: "Machine Learning (ML) is a subset of artificial intelligence that enables computers to learn from data and improve their performance without being explicitly programmed. By analyzing patterns and trends in large datasets, ML algorithms can make predictions, classify information, and even uncover insights that humans might miss. From recommending movies on streaming platforms to detecting fraud in banking and powering self-driving cars, ML is at the heart of many modern technologies. As businesses and researchers continue to harness its potential, ML is not just transforming industries—it’s reshaping the way we interact with the world around us." }

// ];


const PostCard = ({ post, onDelete, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedBody, setEditedBody] = useState(post.body);

  const handleSave = () => {
    onEdit(post.id, editedTitle, editedBody);
    setIsEditing(false); 
    setIsExpanded(true); 
  };

  if (isEditing) {
    return (
      <div className="post-card editing">
        <input type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)}
          className="edit-input-title" />
        <textarea value={editedBody} onChange={e => setEditedBody(e.target.value)} className="edit-textarea-body" />
        <div className="edit-actions">
          <button onClick={handleSave} className="save-btn"> Save </button>
          <button onClick={() => setIsEditing(false)} className="cancel-btn"> Cancel </button>
        </div>
      </div>
    );
  }

  return (
    <div className="post-card">
      <p className="user-id">User ID: {post.userId}</p>
      <h3>{post.title}</h3>
      <p className={`post-body ${isExpanded ? "expanded" : "collapsed"}`}>
        {isExpanded ? post.body : `${post.body.substring(0, 100)}...`}
      </p>

      <div className="post-actions-container">
        <button className="readmore-btn" onClick={() => setIsExpanded(!isExpanded)}> {isExpanded ? "Read less" : "Read more"} </button>
        
        {}

        {isExpanded && (
          <div className="action-buttons">
            <button className="edit-btn" onClick={() => setIsEditing(true)}> Edit ✏️</button>
            <button className="delete-btn" onClick={() => onDelete(post.id)}> Delete 🗑️ </button>
          </div>
        
        )}
      </div>
    </div>
  );
};


const FeedPage = ({ onLogout }) => {
  const [showForm, setShowForm] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  
  const [posts, setPosts] = useState(() => {
    const cachedPosts = localStorage.getItem("feed_posts");
    return cachedPosts ? JSON.parse(cachedPosts) : dummyPosts;
  });

  useEffect(() => {
    localStorage.setItem("feed_posts", JSON.stringify(posts));
  }, [posts]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!postTitle || !postBody) return; 
    
    const newPost = {
      id: Date.now(),
      userId: 1, 
      title: postTitle,
      body: postBody
    };
    setPosts([newPost, ...posts]);
    setPostTitle("");
    setPostBody("");
    setShowForm(false);
  };


  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
    }
  };


  const handleEditPost = (postId, newTitle, newBody) => {
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, title: newTitle, body: newBody } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="feed-container">
      <header className="navbar">
        <div className="logo-section">
          <span className="logo-icon">☐</span>
          <h1 className="logo-text">Newton</h1>
        </div>
        <div className="nav-links">
          <button className="nav-link" onClick={() => setShowForm(!showForm)}> + Add Post </button>
        </div>
        <button onClick={onLogout} className="logout-btn">Logout ⏏</button>
      </header>

      <main className="main-content">
        <h2 className="welcome-title">Welcome to Feed</h2>

        {showForm && (
          <form className="add-post-form" onSubmit={handleSubmit}>
            <input
              type="text" placeholder="Post title" value={postTitle} onChange={e => setPostTitle(e.target.value)} required />

            <textarea placeholder="Post content" value={postBody} onChange={e => setPostBody(e.target.value)} required />
            <button type="submit">Add Post</button>
          </form>
        )}

        <div className="post-grid">
          {posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              onDelete={handleDeletePost} 
              onEdit={handleEditPost}     
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default FeedPage;


