package com.farmer.main.entities;

public class PostDTO {
    private Long id;
    private String title;
    private String content;
    private String imagePath;
    private String timestamp;
    private Long userId;
    private String userName;
    private String userRole; // Added user role
    private int likes; // Add likes field

    public PostDTO(Long id, String title, String content, String imagePath, String timestamp, Long userId, String userName, String userRole, int likes) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.imagePath = imagePath;
        this.timestamp = timestamp;
        this.userId = userId;
        this.userName = userName;
        this.userRole = userRole;
        this.likes = likes;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getImagePath() { return imagePath; }
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserRole() { return userRole; }
    public void setUserRole(String userRole) { this.userRole = userRole; }

    public int getLikes() { return likes; }
    public void setLikes(int likes) { this.likes = likes; }
}
