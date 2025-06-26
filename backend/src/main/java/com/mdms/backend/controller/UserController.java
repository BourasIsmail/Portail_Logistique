package com.mdms.backend.controller;

import com.mdms.backend.entity.CategoryMat;
import com.mdms.backend.entity.Ticket;
import com.mdms.backend.entity.User;
import com.mdms.backend.request.TicketRequest;
import com.mdms.backend.respository.CategoryMatRepository;
import com.mdms.backend.respository.UserRepository;
import com.mdms.backend.security.service.UserDetailsImp;
import com.mdms.backend.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TicketService ticketService;
    @Autowired
    private CategoryMatRepository categoryMatRepository;


    @PostMapping("/create-ticket")
    private ResponseEntity<?> createTicket(@Valid @RequestBody  TicketRequest request, @AuthenticationPrincipal UserDetailsImp userDetails) {
        User user = userRepository.findByEmail(userDetails.getEmail())
                .orElseThrow(()-> new RuntimeException("User not found with email : " + userDetails.getEmail()));

        CategoryMat category = categoryMatRepository.findByCtgrId(request.getCtgrId())
                .orElseThrow(()-> new RuntimeException("Category not found with id : " + request.getCtgrId()));

            Ticket ticket;
            try {
                ticket = ticketService.addTicket(request, user, category);
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }

       Map<String, ?> response = Map.of("message", "Ticket created successfully!", "ticket", ticket);

        return ResponseEntity.ok(response);
    }
}
