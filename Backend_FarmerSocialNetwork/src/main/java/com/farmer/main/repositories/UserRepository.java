package com.farmer.main.repositories;

import com.farmer.main.entities.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByEmail(String email);
	
	@EntityGraph(attributePaths = {"specializations"})
    Optional<User> findById(Long id);
}