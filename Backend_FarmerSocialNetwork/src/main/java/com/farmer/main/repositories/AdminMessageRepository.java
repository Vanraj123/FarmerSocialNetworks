package com.farmer.main.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.farmer.main.entities.AdminMessage;

@Repository
public interface AdminMessageRepository extends JpaRepository<AdminMessage, Long> {
    AdminMessage findTopByOrderByTimestampDesc();
}

