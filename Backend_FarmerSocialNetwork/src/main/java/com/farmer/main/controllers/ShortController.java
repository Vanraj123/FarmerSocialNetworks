package com.farmer.main.controllers;

import com.farmer.main.entities.Short;
import com.farmer.main.entities.User;
import com.farmer.main.repositories.ShortRepository;
import com.farmer.main.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/shorts")
@CrossOrigin(origins = "http://localhost:3000")
public class ShortController {

    private static final Logger logger = LoggerFactory.getLogger(ShortController.class);

    @Autowired
    private ShortRepository shortRepository;

    @Autowired
    private UserRepository userRepository;

    private final String VIDEO_DIRECTORY = "C:/xampp/htdocs/shorts_videos/";

    @PostMapping("/upload")
    public ResponseEntity<String> uploadShort(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("userId") Long userId,
            @RequestParam("video") MultipartFile video) {
        try {
            // Fetch user
            Optional<User> userOpt = userRepository.findById(userId);
            if (userOpt.isEmpty()) {
                logger.error("User not found with ID: {}", userId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

            // Check directory
            File dir = new File(VIDEO_DIRECTORY);
            if (!dir.exists() && !dir.mkdirs()) {
                logger.error("Failed to create directory: {}", VIDEO_DIRECTORY);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create directory");
            }

            // Save video to directory
            String fileName = System.currentTimeMillis() + "_" + video.getOriginalFilename();
            File videoFile = new File(VIDEO_DIRECTORY + fileName);
            video.transferTo(videoFile);

            // Save Short to database
            Short newShort = new Short();
            newShort.setTitle(title);
            newShort.setDescription(description);
            newShort.setVideoPath("/shorts_videos/" + fileName);
            newShort.setUploadedBy(userOpt.get());
            shortRepository.save(newShort);

            logger.info("Short uploaded successfully: {}", newShort);
            return ResponseEntity.status(HttpStatus.CREATED).body("Short uploaded successfully");
        } catch (IOException e) {
            logger.error("Error saving video", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving video: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Short>> getAllShorts() {
        return ResponseEntity.ok(shortRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getShortById(@PathVariable Long id) {
        Optional<Short> shortOpt = shortRepository.findById(id);
        if (shortOpt.isPresent()) {
            return ResponseEntity.ok(shortOpt.get());
        } else {
            logger.error("Short not found with ID: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Short not found");
        }
    }
    
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteShort(@PathVariable Long id, @RequestParam Long adminId) {
//        // Check if the admin exists and their role is "admin"
//        Optional<User> adminOpt = userRepository.findById(adminId);
//        if (adminOpt.isEmpty() || !adminOpt.get().getRole().equalsIgnoreCase("admin")) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admins can delete shorts.");
//        }
//
//        // Check if the short exists
//        Optional<Short> shortOpt = shortRepository.findById(id);
//        if (shortOpt.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Short not found.");
//        }
//
//        // Delete the short
//        try {
//            shortRepository.deleteById(id);
//            return ResponseEntity.ok("Short deleted successfully.");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting short.");
//        }
//    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteShort(@PathVariable Long id, @RequestParam Long userId) {
        // Check if the user exists
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        User user = userOpt.get();

        // Check if the short exists
        Optional<Short> shortOpt = shortRepository.findById(id);
        if (shortOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Short not found.");
        }

        Short shortToDelete = shortOpt.get();

        // Allow deletion if the user is an admin or the uploader
        if (user.getRole().equalsIgnoreCase("admin") || shortToDelete.getUploadedBy().getId().equals(userId)) {
            try {
                shortRepository.deleteById(id);
                return ResponseEntity.ok("Short deleted successfully.");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting short.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to delete this short.");
        }
    }


}
