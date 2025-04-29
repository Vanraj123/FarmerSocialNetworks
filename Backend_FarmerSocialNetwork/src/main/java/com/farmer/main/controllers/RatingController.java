package com.farmer.main.controllers;

import com.farmer.main.entities.Rating;
import com.farmer.main.repositories.RatingRepository;
import com.farmer.main.repositories.UserRepository;
import com.farmer.main.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private UserRepository userRepository;

    // DTO to send only required fields
    public static class RatingDTO {
        private Long id;
        private Long userId;
        private Long ratedUserId;
        private Long cropResourceId;
        private float ratingValue;
        private float avgRating; // Added avgRating field

        public RatingDTO(Rating rating) {
            this.id = rating.getId();
            this.userId = rating.getUser().getId();
            this.ratedUserId = rating.getRatedUser().getId();
            this.cropResourceId = rating.getCropResource().getId();
            this.ratingValue = rating.getRatingValue();
            this.avgRating = rating.getAvgRating(); // Include avgRating
        }

        // Getters
        public Long getId() { return id; }
        public Long getUserId() { return userId; }
        public Long getRatedUserId() { return ratedUserId; }
        public Long getCropResourceId() { return cropResourceId; }
        public float getRatingValue() { return ratingValue; }
        public float getAvgRating() { return avgRating; } // Getter for avgRating
    }

    // Get all ratings (sending only foreign key values)
    @GetMapping
    public List<RatingDTO> getAllRatings() {
        return ratingRepository.findAll()
                .stream()
                .map(RatingDTO::new)
                .collect(Collectors.toList());
    }

    // Get ratings given by a specific user
    @GetMapping("/user/{userId}")
    public List<RatingDTO> getRatingsByUser(@PathVariable Long userId) {
        return ratingRepository.findByUserId(userId)
                .stream()
                .map(RatingDTO::new)
                .collect(Collectors.toList());
    }

    // Get ratings received by a specific user
    @GetMapping("/rated-user/{ratedUserId}")
    public List<RatingDTO> getRatingsForRatedUser(@PathVariable Long ratedUserId) {
        return ratingRepository.findByRatedUserId(ratedUserId)
                .stream()
                .map(RatingDTO::new)
                .collect(Collectors.toList());
    }

    // DTO to send only avgRating and cropResourceId
    public static class CropResourceAvgRatingDTO {
        private Long cropResourceId;
        private float avgRating;

        public CropResourceAvgRatingDTO(Long cropResourceId, float avgRating) {
            this.cropResourceId = cropResourceId;
            this.avgRating = avgRating;
        }

        // Getters
        public Long getCropResourceId() { return cropResourceId; }
        public float getAvgRating() { return avgRating; }
    }

    @GetMapping("/crop-resource/{cropResourceId}")
    public ResponseEntity<CropResourceAvgRatingDTO> getLatestAvgRatingByCropResource(@PathVariable Long cropResourceId) {
        List<Rating> ratings = ratingRepository.findByCropResourceId(cropResourceId);

        if (ratings.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        // Fetch the latest avgRating from the most recent rating
        Rating latestRating = ratings.get(ratings.size() - 1); // Assuming latest rating is the last one in the list

        return ResponseEntity.ok(new CropResourceAvgRatingDTO(cropResourceId, latestRating.getAvgRating()));
    }

    // Add or update a rating
    @PostMapping
    public ResponseEntity<Rating> createOrUpdateRating(@RequestBody Rating rating) {
        // Check if the rating already exists
        Rating existingRating = ratingRepository.findByUserIdAndRatedUserIdAndCropResourceId(
                rating.getUser().getId(),
                rating.getRatedUser().getId(),
                rating.getCropResource().getId()
        );

        if (existingRating != null) {
            // Update the existing rating
            existingRating.setRatingValue(rating.getRatingValue());
            ratingService.saveRating(existingRating);
            return ResponseEntity.ok(existingRating);
        } else {
            // Save a new rating
            Rating newRating = ratingService.saveRating(rating);
            return ResponseEntity.ok(newRating);
        }
    }

    // Delete a rating
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRating(@PathVariable Long id) {
        ratingRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
