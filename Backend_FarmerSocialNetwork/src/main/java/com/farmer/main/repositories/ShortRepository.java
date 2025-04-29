package com.farmer.main.repositories;

import com.farmer.main.entities.Short;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShortRepository extends JpaRepository<Short, Long> {
}