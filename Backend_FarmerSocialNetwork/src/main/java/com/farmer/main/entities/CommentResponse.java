package com.farmer.main.entities;

public class CommentResponse {
    private Long id;
    private Long postId;
    private String content;
    private String timestamp;
    private String username;
    private Long userId; 
    private String role; // Add role field

    // Constructor
    public CommentResponse(Long id, Long postId, String content, String timestamp, String username, Long userId, String role) {
        this.id = id;
        this.postId = postId;
        this.content = content;
        this.timestamp = timestamp;
        this.username = username;
        this.userId = userId;
        this.role = role; // Initialize role
    }

    // Getters and setters for all fields
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
