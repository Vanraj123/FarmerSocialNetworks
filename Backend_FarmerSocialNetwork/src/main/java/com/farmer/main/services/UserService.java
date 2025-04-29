package com.farmer.main.services;

import com.farmer.main.entities.User;
import com.farmer.main.entities.UserDTO;
import com.farmer.main.entities.Specialist;
import com.farmer.main.repositories.SpecialistRepository;
import com.farmer.main.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.HashSet;
import java.util.ArrayList;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private SpecialistRepository specialistRepository;

    private final String IMAGE_BASE_URL = "http://localhost/profile_images/";

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public UserDTO getUserDTOById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            return null;
        }
        User user = userOptional.get();

        // Generate UserDTO
        UserDTO userDTO = new UserDTO(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getRole(),
            user.getLocation(),
            user.getContactInfo(),
            IMAGE_BASE_URL + user.getProfileImagePath()
        );

        return userDTO;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User updateUserProfile(Long id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setLocation(updatedUser.getLocation());
            user.setContactInfo(updatedUser.getContactInfo());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public String updateUserPassword(Long id, String oldPassword, String newPassword) {
        return userRepository.findById(id).map(user -> {
            if (!user.getPassword().equals(oldPassword)) {
                throw new RuntimeException("Old password does not match.");
            }
            user.setPassword(newPassword);
            userRepository.save(user);
            return "Password updated successfully.";
        }).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public User updateUserSpecializations(Long id, List<String> specialismTypes) {
        return userRepository.findById(id).map(user -> {
            // Find existing specialist or create a new one
            Specialist specialist = user.getSpecializations().stream().findFirst().orElse(new Specialist());

            // Update specialism types
            specialist.setSpecialismTypes(new ArrayList<>(specialismTypes));
            specialistRepository.save(specialist);

            Set<Specialist> specializations = new HashSet<>();
            specializations.add(specialist);

            user.setSpecializations(specializations);
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
}
