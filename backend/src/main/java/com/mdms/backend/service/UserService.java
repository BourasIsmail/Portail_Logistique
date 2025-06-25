package com.mdms.backend.service;

import com.mdms.backend.entity.User;
import com.mdms.backend.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public void saveUser(User user) {
        userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(()-> new RuntimeException("User not found with email : " + email));
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(()-> new RuntimeException("User not found with id : " + id));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
