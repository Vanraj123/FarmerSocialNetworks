package com.farmer.main.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.farmer.main.entities.AdminMessage;
import com.farmer.main.entities.User;
import com.farmer.main.repositories.AdminMessageRepository;
import com.farmer.main.repositories.UserRepository;

import java.time.LocalDateTime;

@Service
public class AdminMessageService {
    @Autowired
    private AdminMessageRepository repository;

    @Autowired
    private UserRepository userRepository;

    public AdminMessage saveMessage(String message, Long adminId) {
        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid admin ID"));

        AdminMessage adminMessage = new AdminMessage();
        adminMessage.setMessage(message);
        adminMessage.setTimestamp(LocalDateTime.now());
        adminMessage.setAdmin(admin);
        return repository.save(adminMessage);
    }

    public AdminMessage getLatestMessage() {
        return repository.findTopByOrderByTimestampDesc();
    }
}

