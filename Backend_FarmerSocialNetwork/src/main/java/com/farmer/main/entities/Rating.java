package com.farmer.main.entities;

import jakarta.persistence.*;

@Entity
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // The user who gave the rating

    @ManyToOne
    @JoinColumn(name = "rated_user_id", nullable = false)
    private User ratedUser; // The user who is being rated

    @ManyToOne
    @JoinColumn(name = "crop_resource_id", nullable = false)
    private CropResource cropResource; // The crop resource being rated

    @Column(nullable = false)
    private float ratingValue; // Individual rating (1-5)

    @Column(nullable = false)
    private float avgRating; // Average rating of the rated user

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getRatedUser() {
        return ratedUser;
    }

    public void setRatedUser(User ratedUser) {
        this.ratedUser = ratedUser;
    }

    public CropResource getCropResource() {
        return cropResource;
    }

    public void setCropResource(CropResource cropResource) {
        this.cropResource = cropResource;
    }

    public float getRatingValue() {
        return ratingValue;
    }

    public void setRatingValue(float ratingValue) {
        this.ratingValue = ratingValue;
    }

    public float getAvgRating() {
        return avgRating;
    }

    public void setAvgRating(float avgRating) {
        this.avgRating = avgRating;
    }
}
