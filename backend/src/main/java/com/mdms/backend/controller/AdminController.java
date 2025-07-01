package com.mdms.backend.controller;

import com.mdms.backend.entity.*;
import com.mdms.backend.request.AddMaterialRequest;
import com.mdms.backend.request.AddServiceRequest;
import com.mdms.backend.request.AddUserRequest;
import com.mdms.backend.response.TicketsResponse;
import com.mdms.backend.response.UserTicketsResponse;
import com.mdms.backend.respository.*;
import com.mdms.backend.security.service.UserDetailsImp;
import com.mdms.backend.service.CategoryMatService;
import com.mdms.backend.service.MaterialService;
import com.mdms.backend.service.TicketService;
import com.mdms.backend.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

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
    @Autowired
    private TicketService ticketService;
    @Autowired
    private TicketRepository ticketRepository;

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

    @GetMapping("/get-allTickets")
    private ResponseEntity<?> getTickets() {
        List<Ticket> ticketsInfo = ticketService.getTickets();

        List<TicketsResponse> tickets = new ArrayList<>();
        for(Ticket ticket : ticketsInfo){
            TicketsResponse tk = new TicketsResponse();

            tk.setId(ticket.getTicketId());
            tk.setTicketDescription(ticket.getTicketDescription());
            tk.setDate(new SimpleDateFormat("dd-MM-yyyy").format(ticket.getCreatedDate()));
            try{
            if(ticket.getUser() != null){
                tk.setService(ticket.getUser().getService().getServiceName());
            }}
            catch (Exception e){
                tk.setService("No service");
            }
            tk.setCategory(ticket.getCategoryMat().getCtgrName());
            tk.setTicketStatus(ticket.getTicketStatus().name());
            tk.setNote(ticket.getNote() == null ? "" : ticket.getNote());
            tk.setNeeds(ticket.getNeeds().stream()
                    .map(needs -> needs.getQuantity() + " " + needs.getMaterial().getMatName())
                    .collect(Collectors.joining(", ")));
            tk.setArchived(ticket.isArchived());

            tickets.add(tk);
        }

        Map<String, ?> response = Map.of("message", "Tickets fetched successfully!", "tickets", tickets);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/archive-ticket/{id}")
    private ResponseEntity<?> archiveTicket(@PathVariable("id") Long id){
        Ticket ticket = ticketRepository.findById(id).orElseThrow(()-> new RuntimeException("Ticket not found with id : " + id));

        ticket.setArchived(!ticket.isArchived());

        ticketRepository.save(ticket);

        return ResponseEntity.ok("Ticket archived successfully!");
    }

    @PutMapping("/update-ticket-status/{id}")
    private ResponseEntity<?> updateTicketStatus(@PathVariable("id") Long id, @RequestBody Map<String, String> requestBody){
        Ticket ticket = ticketRepository.findById(id).orElseThrow(()-> new RuntimeException("Ticket not found with id : " + id));

        try{
            ticket.setTicketStatus(TicketStatus.valueOf(requestBody.get("status")));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }

        ticket.setNote(requestBody.get("note") != null ? requestBody.get("note") : "");

        ticketRepository.save(ticket);

        return ResponseEntity.ok("Ticket status updated successfully!");
    }

}
