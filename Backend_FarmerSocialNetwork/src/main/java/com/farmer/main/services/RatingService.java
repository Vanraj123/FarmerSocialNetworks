package com.farmer.main.services;

import com.farmer.main.entities.Rating;
import com.farmer.main.entities.User;
import com.farmer.main.repositories.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RatingService {
    @Autowired
    private RatingRepository ratingRepository;

    @Transactional
    public Rating saveRating(Rating rating) {
        // Save the new rating
        rating = ratingRepository.save(rating);

        // Update the average rating for the rated user
        float newAvgRating = updateAvgRating(rating.getRatedUser());

        // Store the latest average rating in the `avgRating` column
        rating.setAvgRating(newAvgRating);
        return ratingRepository.save(rating);
    }

    private float updateAvgRating(User ratedUser) {
        List<Rating> ratings = ratingRepository.findByRatedUser(ratedUser);
        if (!ratings.isEmpty()) {
            double avg = ratings.stream()
                                .mapToDouble(Rating::getRatingValue)
                                .average()
                                .orElse(0.0);
            return (float) avg;
        }
        return 0.0f;
    }

    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }

    public List<Rating> findByUser(User user) {
        return ratingRepository.findByUser(user);
    }
}
