package com.farmer.main.controllers;

import com.farmer.main.entities.Specialist;
import com.farmer.main.services.SpecialistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/specialists")
public class SpecialistController {
    @Autowired
    private SpecialistService specialistService;

    @GetMapping
    public List<Specialist> getAllSpecialists() {
        return specialistService.getAllSpecialists();
    }

    @PostMapping
    public Specialist createSpecialist(@RequestBody Specialist specialist) {
        return specialistService.saveSpecialist(specialist);
    }
}
