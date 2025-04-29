package com.farmer.main.services;

import com.farmer.main.entities.Specialist;
import com.farmer.main.repositories.SpecialistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecialistService {

    @Autowired
    private SpecialistRepository specialistRepository;

    public List<Specialist> getAllSpecialists() {
        return specialistRepository.findAll();
    }

    public Specialist getSpecialistById(Long id) {
        return specialistRepository.findById(id).orElse(null);
    }

    public Specialist saveSpecialist(Specialist specialist) {
        return specialistRepository.save(specialist);
    }

    public void deleteSpecialist(Long id) {
        specialistRepository.deleteById(id);
    }
}
