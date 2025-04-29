package com.farmer.main.controllers;

import com.farmer.main.entities.CropResource;
import com.farmer.main.entities.User;
import com.farmer.main.services.CropResourceService;
import com.farmer.main.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/crop-resources")
public class CropResourceController {
    @Autowired
    private CropResourceService cropResourceService;
    
    @Autowired
    private UserService userService;

    @GetMapping
    public List<CropResource> getAllCropResources() {
        return cropResourceService.getAllCropResources();
    }

    @PostMapping
    public ResponseEntity<?> uploadCropResource(@RequestBody CropResource cropResource, @RequestParam Long userId) {
        try {
            // Fetch the User by userId
            User user = userService.getUserById(userId);
            
            // Set the User to the CropResource
            cropResource.setUploadedBy(user);
            
            // Save the CropResource with the associated User
            cropResourceService.saveCropResource(cropResource, userId);
            
            return ResponseEntity.ok("Resource uploaded successfully!");
        } catch (Exception e) {
            System.out.println("Error occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing the resource");
        }
    }


    @GetMapping("/{id}")
    public CropResource getCropResourceById(@PathVariable Long id) {
        return cropResourceService.getCropResourceById(id);
    }
    
//    @GetMapping("/upload/{resourceId}")
//    public ResponseEntity<?> getUploaderName(@PathVariable Long resourceId) {
//        try {
//            CropResource cropResource = cropResourceService.getCropResourceById(resourceId);
//            if (cropResource == null || cropResource.getUploadedBy() == null) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource or uploader not found");
//            }
//            User uploader = cropResource.getUploadedBy();
//            return ResponseEntity.ok(Collections.singletonMap("uploaderName", uploader.getName()));
//
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving uploader name");
//        }
//    }
    @GetMapping("/upload/{resourceId}")
    public ResponseEntity<?> getUploaderDetails(@PathVariable Long resourceId) {
        try {
            CropResource cropResource = cropResourceService.getCropResourceById(resourceId);
            if (cropResource == null || cropResource.getUploadedBy() == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource or uploader not found");
            }

            User uploader = cropResource.getUploadedBy();

            // Create a response map containing both name and ID
            Map<String, Object> response = new HashMap<>();
            response.put("uploaderName", uploader.getName());
            response.put("uploaderId", uploader.getId());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving uploader details");
        }
    }


    @GetMapping("/category/{category}")
    public List<CropResource> getCropResourcesByCategory(@PathVariable("category") String category) {
        try {
            CropResource.Season seasonCategory = CropResource.Season.valueOf(category.toUpperCase());
            return cropResourceService.getCropResourcesByCategory(seasonCategory);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid category provided.");
        }
    }

    @GetMapping("/categories")
    public List<String> getCategories() {
        return cropResourceService.getAllCategories(); // Return a list of category names
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteCropResource(@PathVariable Long id, @RequestParam Long userId) {
//        User user = userService.getUserById(userId);
//        
//        if (user == null || !user.getRole().equalsIgnoreCase("admin")) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admins can delete resources.");
//        }
//
//        cropResourceService.deleteCropResource(id);
//        return ResponseEntity.ok("Resource deleted successfully.");
//    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCropResource(@PathVariable Long id, @RequestParam Long userId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User not found.");
        }
        
        CropResource resource = cropResourceService.getCropResourceById(id);
        if (resource == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource not found.");
        }
        
        // Allow deletion if user is admin OR the original uploader
        if (user.getRole().equalsIgnoreCase("admin") || 
            (resource.getUploadedBy() != null && resource.getUploadedBy().getId().equals(userId))) {
            cropResourceService.deleteCropResource(id);
            return ResponseEntity.ok("Resource deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You don't have permission to delete this resource.");
        }
    }
 

}
