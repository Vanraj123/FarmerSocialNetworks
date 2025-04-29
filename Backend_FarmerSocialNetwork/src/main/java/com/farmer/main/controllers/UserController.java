package com.farmer.main.controllers;

import com.farmer.main.entities.Specialist;
import com.farmer.main.entities.User;
import com.farmer.main.entities.UserDTO;
import com.farmer.main.repositories.UserRepository;
import com.farmer.main.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private UserRepository userRepository;
    
    private final String UPLOAD_DIR = "C:/xampp/htdocs/uploads"; // Update to the correct folder
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping("/{id}/upload-profile")
    public ResponseEntity<String> uploadProfileImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Optional<User> userOptional = userService.findById(id);
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        User user = userOptional.get();

        // Validate file
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        String fileName = "user_" + id + "_" + file.getOriginalFilename();
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        File destinationFile = new File(uploadDir, fileName);

        try {
            // Save file
            file.transferTo(destinationFile);

            // Update user's profile image path
            user.setProfileImagePath(fileName);
            userService.save(user);

            return ResponseEntity.ok("Profile image uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error saving file");
        }
    }
    
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @GetMapping("/{id}/profile")
    public ResponseEntity<UserDTO> getUserProfile(@PathVariable Long id) {
        Optional<User> userOptional = userService.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            UserDTO userDTO = new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getLocation(),
                user.getContactInfo(),
                "http://localhost/uploads/" + user.getProfileImagePath() // Update URL path
            );
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/{id}/profile")
    public ResponseEntity<UserDTO> updateUserProfile(@PathVariable Long id, @RequestParam Map<String, String> updatedFields, @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) {
        Optional<User> userOptional = userService.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            
            if (updatedFields.containsKey("name")) user.setName(updatedFields.get("name"));
            if (updatedFields.containsKey("email")) user.setEmail(updatedFields.get("email"));
            if (updatedFields.containsKey("location")) user.setLocation(updatedFields.get("location"));
            if (updatedFields.containsKey("contactInfo")) user.setContactInfo(updatedFields.get("contactInfo"));

            // If a new profile image is provided, handle it
            if (profileImage != null && !profileImage.isEmpty()) {
                try {
                    String fileName = "user_" + id + "_" + profileImage.getOriginalFilename();
                    File destinationFile = new File(UPLOAD_DIR, fileName);

                    profileImage.transferTo(destinationFile);
                    user.setProfileImagePath(fileName);
                } catch (IOException e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
                }
            }
            
            userService.save(user);
            
            // Prepare updated UserDTO
            UserDTO updatedUserDTO = new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getLocation(),
                user.getContactInfo(),
                "http://localhost/uploads/" + user.getProfileImagePath() // Update URL path
            );

            return ResponseEntity.ok(updatedUserDTO);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/{id}/specializations")
    public ResponseEntity<User> updateUserSpecializations(@PathVariable Long id, @RequestBody List<String> specialismTypes) {
        System.out.println("Incoming specializations: " + specialismTypes); // Log incoming data
        try {
            Optional<User> userOptional = userService.findById(id);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                System.out.println("User found: " + user); // Log user data
                User updatedUser = userService.updateUserSpecializations(id, specialismTypes);
                System.out.println("Updated user: " + updatedUser); // Log updated user data
                return ResponseEntity.ok(updatedUser);
            } else {
                System.out.println("User not found with id: " + id); // Log not found
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
//    @GetMapping("/{id}/specializations")
//    public ResponseEntity<List<String>> getUserSpecializations(@PathVariable Long id) {
//        Optional<User> userOptional = userService.findById(id);
//        if (userOptional.isPresent()) {
//            User user = userOptional.get();
//            Set<Specialist> specializations = user.getSpecializations();
//            List<String> specialismTypes = specializations.stream()
//                    .flatMap(specialist -> specialist.getSpecialismTypes().stream())
//                    .toList();
//            return ResponseEntity.ok(specialismTypes);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
    @GetMapping("/{id}/specializations")
    public ResponseEntity<Set<String>> getUserSpecializations(@PathVariable Long id) {
        Optional<User> userOptional = userService.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Set<String> specialismTypes = user.getSpecializations().stream()
                    .flatMap(specialist -> specialist.getSpecialismTypes().stream())
                    .collect(Collectors.toSet());
            return ResponseEntity.ok(specialismTypes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    @PutMapping("/{id}/password")
    public ResponseEntity<String> updatePassword(@PathVariable Long id, @RequestBody Map<String, String> passwordData) {
        String oldPassword = passwordData.get("oldPassword");
        String newPassword = passwordData.get("newPassword");
        return ResponseEntity.ok(userService.updateUserPassword(id, oldPassword, newPassword));
    }
}
