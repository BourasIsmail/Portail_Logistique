package com.mdms.backend.controller;

import com.mdms.backend.entity.CategoryMat;
import com.mdms.backend.entity.Ticket;
import com.mdms.backend.entity.User;
import com.mdms.backend.request.TicketRequest;
import com.mdms.backend.response.UserTicketsResponse;
import com.mdms.backend.respository.CategoryMatRepository;
import com.mdms.backend.respository.UserRepository;
import com.mdms.backend.security.service.UserDetailsImp;
import com.mdms.backend.service.TicketService;
import com.mdms.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TicketService ticketService;
    @Autowired
    private CategoryMatRepository categoryMatRepository;
    @Autowired
    private UserService userService;


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


//    @PostMapping("/logout")
//    public ResponseEntity<?> logout() {
//        ResponseCookie cookie = ResponseCookie.from("jwt", "")
//                .httpOnly(true)
//                .path("/")
//                .maxAge(0) // Expire immediately
//                .sameSite("Strict")
//                .build();
//
//        return ResponseEntity.ok()
//                .header(HttpHeaders.SET_COOKIE, cookie.toString())
//                .body(Map.of("message", "Logged out successfully"));
//    }
    @GetMapping("/get-allTickets")
    private ResponseEntity<?> getTickets(@AuthenticationPrincipal UserDetailsImp userDetails) {
        User user = userService.getUserById(userDetails.getId());

        List<Ticket> userTickets = user.getTickets();

        userTickets.sort(Comparator.comparing(Ticket::getCreatedDate).reversed());

        List<UserTicketsResponse> tickets = new ArrayList<>();
        for(Ticket ticket : userTickets){
            UserTicketsResponse tk = new UserTicketsResponse();

            tk.setId(ticket.getTicketId());
            tk.setTicketDescription(ticket.getTicketDescription());
            tk.setDate(new SimpleDateFormat("dd-MM-yyyy").format(ticket.getCreatedDate()));
            tk.setCategory(ticket.getCategoryMat().getCtgrName());
            tk.setTicketStatus(ticket.getTicketStatus().name());
            tk.setObservation(ticket.getObservation() == null ? "" : ticket.getObservation());
            tk.setNote(ticket.getNote() == null ? "" : ticket.getNote());
            tk.setNeeds(ticket.getNeeds().stream()
                    .map(needs -> needs.getQuantity() + " " + needs.getMaterial().getMatName())
                    .collect(Collectors.joining(", ")));

            tickets.add(tk);
        }

        Map<String, ?> response = Map.of("message", "Tickets fetched successfully!", "tickets", tickets);
        return ResponseEntity.ok(response);
    }



//    @GetMapping("/get-materials/{ctgrName}")
//    private ResponseEntity<?> getMaterialsByCat(@PathVariable(name = "ctgrName") String ctgrName) {
//        CategoryMat category = categoryMatRepository.findByCtgrName(ctgrName)
//                .orElseThrow(()-> new RuntimeException("Category not found with name : " + ctgrName));
//
//        Set<Material> materials = category.getMaterials();
//
//        return ResponseEntity.ok(materials);
//    }

    @GetMapping("/get-categories")
    private ResponseEntity<?> getCategories() {
        List<CategoryMat> categories = categoryMatRepository.findAll();

        return ResponseEntity.ok(categories);
    }


}
