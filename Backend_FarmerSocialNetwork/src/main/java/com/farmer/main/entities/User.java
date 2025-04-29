//package com.farmer.main.entities;
//
//import jakarta.persistence.*;
//import com.fasterxml.jackson.annotation.JsonIdentityInfo;
//import com.fasterxml.jackson.annotation.ObjectIdGenerators;
//import java.time.LocalDateTime;
//import java.util.Set;
//
//@Entity
//@Table(name = "users")
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
//public class User {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false)
//    private String name;
//
//    @Column(unique = true)
//    private String email;
//
//    @Column(nullable = false)
//    private String password;
//
//    @Column(nullable = false)
//    private String role;
//
//    @Column
//    private String location;
//
//    @Column
//    private String contactInfo;
//
//    @Column(name = "profile_image_path")
//    private String profileImagePath;
//
//    @Column(name = "date_of_joining", nullable = false, updatable = false)
//    private LocalDateTime dateOfJoining;
//
//    @OneToMany(mappedBy = "uploadedBy", cascade = CascadeType.ALL, orphanRemoval = true)
//    private Set<CropResource> cropResources;
//
//    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    private Set<Rating> ratings;
//
//    @ManyToMany
//    @JoinTable(
//        name = "user_specialist",
//        joinColumns = @JoinColumn(name = "user_id"),
//        inverseJoinColumns = @JoinColumn(name = "specialist_id")
//    )
//    private Set<Specialist> specializations;
//
//    public User() {
//        this.dateOfJoining = LocalDateTime.now();
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public String getRole() {
//        return role;
//    }
//
//    public void setRole(String role) {
//        this.role = role;
//    }
//
//    public String getLocation() {
//        return location;
//    }
//
//    public void setLocation(String location) {
//        this.location = location;
//    }
//
//    public String getContactInfo() {
//        return contactInfo;
//    }
//
//    public void setContactInfo(String contactInfo) {
//        this.contactInfo = contactInfo;
//    }
//
//    public String getProfileImagePath() {
//        return profileImagePath;
//    }
//
//    public void setProfileImagePath(String profileImagePath) {
//        this.profileImagePath = profileImagePath;
//    }
//
//    public LocalDateTime getDateOfJoining() {
//        return dateOfJoining;
//    }
//
//    public void setDateOfJoining(LocalDateTime dateOfJoining) {
//        this.dateOfJoining = dateOfJoining;
//    }
//
//    public Set<CropResource> getCropResources() {
//        return cropResources;
//    }
//
//    public void setCropResources(Set<CropResource> cropResources) {
//        this.cropResources = cropResources;
//    }
//
//    public Set<Rating> getRatings() {
//        return ratings;
//    }
//
//    public void setRatings(Set<Rating> ratings) {
//        this.ratings = ratings;
//    }
//
//    public Set<Specialist> getSpecializations() {
//        return specializations;
//    }
//
//    public void setSpecializations(Set<Specialist> specializations) {
//        this.specializations = specializations;
//    }
//}
package com.farmer.main.entities;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "users")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

    @Column
    private String location;

    @Column
    private String contactInfo;

    @Column(name = "profile_image_path")
    private String profileImagePath;

    @Column(name = "date_of_joining", nullable = false, updatable = false)
    private LocalDateTime dateOfJoining;

    @OneToMany(mappedBy = "uploadedBy", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CropResource> cropResources;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Rating> ratings;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
        name = "user_specialist",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "specialist_id")
    )
    private Set<Specialist> specializations;


    public User() {
        this.dateOfJoining = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    public String getProfileImagePath() {
        return profileImagePath;
    }

    public void setProfileImagePath(String profileImagePath) {
        this.profileImagePath = profileImagePath;
    }

    public LocalDateTime getDateOfJoining() {
        return dateOfJoining;
    }

    public void setDateOfJoining(LocalDateTime dateOfJoining) {
        this.dateOfJoining = dateOfJoining;
    }

    public Set<CropResource> getCropResources() {
        return cropResources;
    }

    public void setCropResources(Set<CropResource> cropResources) {
        this.cropResources = cropResources;
    }

    public Set<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(Set<Rating> ratings) {
        this.ratings = ratings;
    }

    public Set<Specialist> getSpecializations() {
        return specializations;
    }

    public void setSpecializations(Set<Specialist> specializations) {
        this.specializations = specializations;
    }
}

