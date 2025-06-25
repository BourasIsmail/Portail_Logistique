package com.mdms.backend.controller;

import com.mdms.backend.entity.User;
import com.mdms.backend.request.AddUserRequest;
import com.mdms.backend.respository.UserRepository;
import com.mdms.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/add-user")
    private ResponseEntity<?> addUser(@Valid @RequestBody AddUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User user = new User(request.getUsername(), request.getEmail(), passwordEncoder.encode(request.getPassword()));

        userService.saveUser(user);

        Map<String, ?> response = Map.of("message", "User added successfully!", "user", user);

        return ResponseEntity.ok(response);
    }

}
