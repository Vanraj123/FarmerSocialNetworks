package com.farmer.main.services;

import com.farmer.main.entities.CropResource;
import com.farmer.main.entities.User;
import com.farmer.main.repositories.CropResourceRepository;
import com.farmer.main.repositories.RatingRepository; // Import RatingRepository
import com.farmer.main.repositories.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CropResourceService {
    @Autowired
    private CropResourceRepository cropResourceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RatingRepository ratingRepository; // Inject RatingRepository

    public CropResource saveCropResource(CropResource cropResource, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new IllegalArgumentException("User not found with id: " + userId));
        cropResource.setUploadedBy(user); // Link the user to the crop resource
        return cropResourceRepository.save(cropResource);
    }

    public List<CropResource> getAllCropResources() {
        List<CropResource> cropResources = cropResourceRepository.findAll();
        for (CropResource cropResource : cropResources) {
            User uploadedBy = cropResource.getUploadedBy();
            if (uploadedBy != null) {
                System.out.println("Uploaded by: " + uploadedBy.getName());
                System.out.println("Specializations: " + uploadedBy.getSpecializations());
            }
        }
        return cropResources;
    }

    public List<CropResource> getAllCropResourcesWithUploadedBy() {
        return cropResourceRepository.findAll();
    }

    public List<String> getAllCategories() {
        return cropResourceRepository.findDistinctCategories();
    }

    public CropResource getCropResourceById(Long id) {
        return cropResourceRepository.findById(id).orElse(null);
    }

    public List<CropResource> getCropResourcesByCategory(CropResource.Season category) {
        return cropResourceRepository.findByCategory(category);
    }

    @Transactional
    public void deleteCropResource(Long id) {
        // Delete ratings associated with the crop resource
        ratingRepository.deleteByCropResourceId(id);

        // Delete the crop resource
        if (!cropResourceRepository.existsById(id)) {
            throw new IllegalArgumentException("Resource not found.");
        }
        cropResourceRepository.deleteById(id);
    }
}