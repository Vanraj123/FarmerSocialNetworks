package com.farmer.main.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.farmer.main.entities.AdminMessage;
import com.farmer.main.services.AdminMessageService;

@RestController
@RequestMapping("/api/admin")
public class AdminMessageController {
    @Autowired
    private AdminMessageService service;

    @PostMapping("/message")
    public ResponseEntity<?> postMessage(@RequestParam Long adminId, @RequestBody String message) {
        AdminMessage adminMessage = service.saveMessage(message, adminId);
        return ResponseEntity.ok(adminMessage);
    }

    @GetMapping("/message")
    public ResponseEntity<?> getLatestMessage() {
        AdminMessage adminMessage = service.getLatestMessage();
        return ResponseEntity.ok(adminMessage);
    }
}

