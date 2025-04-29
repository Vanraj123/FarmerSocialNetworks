package com.farmer.main.controllers;

import com.farmer.main.entities.User;
import com.farmer.main.repositories.UserRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    
 

    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());
        if (user != null && user.getPassword().equals(loginRequest.getPassword()) && user.getRole().equals(loginRequest.getRole())) {
            return user;
        } else {
            throw new RuntimeException("Invalid credentials or role");
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestParam("name") String name,
                                           @RequestParam("email") String email,
                                           @RequestParam("password") String password,
                                           @RequestParam("role") String role,
                                           @RequestParam("location") String location,
                                           @RequestParam("contactInfo") String contactInfo,
                                           @RequestParam("dateOfJoining") String dateOfJoining,
                                           @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) {

        // Check if email already exists
        User existingUser = userRepository.findByEmail(email);
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already registered.");
        }

        // Create new user
        User newUser = new User();
        newUser.setName(name);
        newUser.setEmail(email);
        newUser.setPassword(password);
        newUser.setRole(role);
        newUser.setLocation(location);
        newUser.setContactInfo(contactInfo);

        // If profile image is uploaded, handle it
        if (profileImage != null && !profileImage.isEmpty()) {
            try {
                // Set the path to the 'uploads' directory inside 'htdocs'
                String uploadDirPath = "C:/xampp/htdocs/uploads/";
                java.io.File uploadDir = new java.io.File(uploadDirPath);
                if (!uploadDir.exists()) {
                    uploadDir.mkdirs();
                }

                String filePath = uploadDirPath + profileImage.getOriginalFilename();

                // Save the image to the specified location
                profileImage.transferTo(new java.io.File(filePath));

                // Set the path in the user entity
                newUser.setProfileImagePath("" + profileImage.getOriginalFilename());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save profile image: " + e.getMessage());
            }
        }

        // Save the new user
        userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully.");
    }


}
