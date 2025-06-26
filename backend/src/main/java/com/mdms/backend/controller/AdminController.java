package com.mdms.backend.controller;

import com.mdms.backend.entity.*;
import com.mdms.backend.request.AddMaterialRequest;
import com.mdms.backend.request.AddServiceRequest;
import com.mdms.backend.request.AddUserRequest;
import com.mdms.backend.respository.*;
import com.mdms.backend.service.CategoryMatService;
import com.mdms.backend.service.MaterialService;
import com.mdms.backend.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
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
    @Autowired
    private MaterialService materialService;
    @Autowired
    private MaterialRepository materialRepository;
    @Autowired
    private CategoryMatRepository categoryMatRepository;
    @Autowired
    private CategoryMatService categoryMatService;
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private DivisionRepository divisionRepository;

    @GetMapping("/test")
    private ResponseEntity<?> test() {
        return ResponseEntity.ok("Test");
    }

    @PostMapping("/add-user")
    private ResponseEntity<?> addUser(@Valid @RequestBody AddUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        Service service = serviceRepository.findByServiceId(request.getServiceId())
                .orElseThrow(()-> new RuntimeException("Service not found with id : " + request.getServiceId()));

        User user = new User(request.getUsername(), request.getEmail(),
                passwordEncoder.encode(request.getPassword()), service);

        userService.saveUser(user);

        Map<String, ?> response = Map.of("message", "User added successfully!", "user", user);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/add-material")
    private ResponseEntity<?> addMaterial(@Valid @RequestBody AddMaterialRequest request) {
        if(materialRepository.existsByMatName(request.getMatName())){
            return ResponseEntity.badRequest().body("Error: Material name is already in use!");
        }

        CategoryMat category = categoryMatRepository.findByCtgrId(request.getCtgrId())
                .orElseThrow(()-> new RuntimeException("Category not found with id : " + request.getCtgrId()));

        Material material = new Material(null, request.getMatName(), category);

        materialService.saveMaterial(material);

        Map<String, ?> response = Map.of("message", "Material added successfully!", "material", material);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/add-category")
    private ResponseEntity<?> addCategory(@NotBlank @RequestParam(name = "ctgrName") String categoryName) {
        if(categoryMatRepository.existsByCtgrName(categoryName)){
            return ResponseEntity.badRequest().body("Error: Category name is already in use!");
        }

        CategoryMat categoryMat = new CategoryMat(null, categoryName, new HashSet<>());

        categoryMatService.saveCategory(categoryMat);

        Map<String, ?> response = Map.of("message", "Category added successfully!", "category", categoryMat);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/add-service")
    private ResponseEntity<?> addService(@Valid @RequestBody AddServiceRequest request) {
        if(serviceRepository.existsByServiceName(request.getServiceName())){
            return ResponseEntity.badRequest().body("Error: Service name is already in use!");
        }

        Division division = divisionRepository.findByDivId(request.getDivId())
                .orElseThrow(()-> new RuntimeException("Division not found with id : " + request.getDivId()));

        Service service = new Service(null, request.getServiceName(), division, new HashSet<>());

        serviceRepository.save(service);

        Map<String, ?> response = Map.of("message", "Service added successfully!", "service", service);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/add-division")
    private ResponseEntity<?> addDivision(@NotBlank @RequestParam("divName") String divisionName) {
        if(divisionRepository.existsByDivName(divisionName)){
            return ResponseEntity.badRequest().body("Error: Division name is already in use!");
        }

        Division division = new Division(null, divisionName, new HashSet<>());

        divisionRepository.save(division);

        Map<String, ?> response = Map.of("message", "Division added successfully!", "division", division);

        return ResponseEntity.ok(response);
    }
}
