package com.farmer.main.services;

import com.farmer.main.entities.Short;
import com.farmer.main.repositories.ShortRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShortService {

    @Autowired
    private ShortRepository shortRepository;

    public List<Short> getAllShorts() {
        return shortRepository.findAll();
    }

    public Short uploadShort(Short newShort) {
        return shortRepository.save(newShort);
    }

    public Short getShortById(Long id) {
        return shortRepository.findById(id).orElse(null);
    }
}
