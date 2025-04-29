package com.farmer.main.repositories;

import com.farmer.main.entities.Rating;
import com.farmer.main.entities.User;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    // Fetch all ratings given by a specific user
    List<Rating> findByUserId(Long userId);

    // Fetch all ratings received by a specific user
    List<Rating> findByRatedUserId(Long ratedUserId);

    // Fetch ratings for a specific crop resource
    List<Rating> findByCropResourceId(Long cropResourceId);

    Rating findByUserIdAndRatedUserIdAndCropResourceId(Long userId, Long ratedUserId, Long cropResourceId);

    List<Rating> findByRatedUser(User ratedUser);

    List<Rating> findByUser(User user);

    @Transactional
    void deleteByCropResourceId(Long cropResourceId);
}