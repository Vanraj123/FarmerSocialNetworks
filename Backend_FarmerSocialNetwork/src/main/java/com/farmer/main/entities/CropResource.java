//package com.farmer.main.entities;
//
//import jakarta.persistence.*;
//
//@Entity
//public class CropResource {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String title;
//    @Column(length = 1000)	
//    private String description;
//
//    @Enumerated(EnumType.STRING)
//    private Season category;
//
//    // Getters and setters
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public Season getCategory() {
//        return category;
//    }
//
//    public void setCategory(Season category) {
//        this.category = category;
//    }
//
//    public enum Season {
//        WINTER, MONSOON, SUMMER
//    }
//}
package com.farmer.main.entities;

import jakarta.persistence.*;

@Entity
public class CropResource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private Season category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "uploaded_by", nullable = false)
    private User uploadedBy;


    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Season getCategory() {
        return category;
    }

    public void setCategory(Season category) {
        this.category = category;
    }

    public User getUploadedBy() {
        return uploadedBy;
    }

    public void setUploadedBy(User uploadedBy) {
        this.uploadedBy = uploadedBy;
    }

    public enum Season {
        WINTER, MONSOON, SUMMER
    }
}
