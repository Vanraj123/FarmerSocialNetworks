//package com.farmer.main.entities;
//
//import jakarta.persistence.*;
//import java.util.List;
//import java.util.Set;
//
//@Entity
//public class Specialist {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ElementCollection
//    @Column(name = "specialism_type", nullable = false)
//    private List<String> specialismTypes; // List of specialism types
//
//    @ManyToMany(mappedBy = "specializations")
//    private Set<User> users; // Reference to users
//
//    // Getters and Setters
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public List<String> getSpecialismTypes() {
//        return specialismTypes;
//    }
//
//    public void setSpecialismTypes(List<String> specialismTypes) {
//        this.specialismTypes = specialismTypes;
//    }
//
//    public Set<User> getUsers() {
//        return users;
//    }
//
//    public void setUsers(Set<User> users) {
//        this.users = users;
//    }
//}

package com.farmer.main.entities;

import jakarta.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class Specialist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    @Column(name = "specialism_type", nullable = false)
    private List<String> specialismTypes; // List of specialism types

    @ManyToMany(mappedBy = "specializations")
    private Set<User> users; // Reference to users

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<String> getSpecialismTypes() {
        return specialismTypes;
    }

    public void setSpecialismTypes(List<String> specialismTypes) {
        this.specialismTypes = specialismTypes;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}

