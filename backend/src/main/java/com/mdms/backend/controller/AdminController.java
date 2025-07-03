package com.mdms.backend.controller;

import com.mdms.backend.entity.*;
import com.mdms.backend.request.AddMaterialRequest;
import com.mdms.backend.request.AddServiceRequest;
import com.mdms.backend.request.AddUserRequest;
import com.mdms.backend.response.*;
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

        Division division = divisionRepository.findByDivName(request.getDivision())
                .orElseThrow(()-> new RuntimeException("Division not found with name : " + request.getDivision()));

        Service service = new Service(null, request.getName(), division, null);
        service = serviceRepository.save(service);

        User user = new User(request.getName(), request.getEmail(), passwordEncoder.encode(request.getPassword()), service);
        service.setUser(user);

        return ResponseEntity.ok(userRepository.save(user));
    }

    @PostMapping("/add-material")
    private ResponseEntity<?> addMaterial(@Valid @RequestBody AddMaterialRequest request) {
        if(materialRepository.existsByMatName(request.getMatName())){
            return ResponseEntity.badRequest().body("Error: Material name is already in use!");
        }

        CategoryMat category = categoryMatRepository.findByCtgrName(request.getCtgrName())
                .orElseThrow(()-> new RuntimeException("Category not found with name : " + request.getCtgrName()));

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

        Service service = new Service(null, request.getServiceName(), division, null);

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

        ticketsInfo.sort(Comparator.comparing(Ticket::getCreatedDate).reversed());

        List<TicketsResponse> tickets = new ArrayList<>();
        for(Ticket ticket : ticketsInfo){
            TicketsResponse tk = new TicketsResponse();

            tk.setId(ticket.getTicketId());
            tk.setTicketDescription(ticket.getTicketDescription());
            tk.setDate(ticket.getCreatedDate());
            tk.setService(ticket.getUser().getService().getServiceName());
            tk.setObservation(ticket.getObservation() == null ? "" : ticket.getObservation());
            tk.setCategory(ticket.getCategoryMat().getCtgrName());
            tk.setTicketStatus(ticket.getTicketStatus().name());
            tk.setNote(ticket.getNote() == null ? "" : ticket.getNote());

            List<NeedResponse> needs = new ArrayList<>();
            for (Needs need: ticket.getNeeds()){
                needs.add(new NeedResponse(need.getMaterial().getMatName(), need.getQuantity(),
                        need.getAffectation()));
            }

            tk.setNeeds(needs);
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

    @GetMapping("/get-materials")
    private ResponseEntity<?> getAllMaterials(){
        List<Material> materials = materialRepository.findAll();

        List<MaterialResponse> materialResponses = new ArrayList<>();
        for(Material material : materials){
            MaterialResponse mr = new MaterialResponse();

            mr.setId(material.getMatId());
            mr.setMatName(material.getMatName());
            mr.setCtgrName(material.getCategory().getCtgrName());

            materialResponses.add(mr);
        }

        return ResponseEntity.ok(materialResponses);
    }

    @PutMapping("/update-material/{id}")
    private ResponseEntity<?> updateMaterialInfo(@PathVariable("id") Long id, @RequestBody Map<String, String> requestBody){
        Material material = materialRepository.findById(id).orElseThrow(()-> new RuntimeException("Material not found with id : " + id));

        material.setMatName(requestBody.get("matName"));
        material.setCategory(categoryMatRepository.findByCtgrName(requestBody.get("ctgrName"))
                .orElseThrow(()-> new RuntimeException("Category not found with name : " + requestBody.get("ctgrName"))));

        materialRepository.save(material);

        return ResponseEntity.ok("Material updated successfully!");
   }

   @DeleteMapping("/delete-material/{id}")
    private ResponseEntity<?> deleteMaterial(@PathVariable("id") Long id){
       Material material = materialRepository.findById(id).orElseThrow(()-> new RuntimeException("Material not found with id : " + id));
       materialRepository.delete(material);
       return ResponseEntity.ok("Material deleted successfully!");
    }

    @GetMapping("/get-divisions")
    private ResponseEntity<?> getAllDivisions(){
        List<Division> divisions = divisionRepository.findAll();

        List<String> divisionsNames = new ArrayList<>();
        for(Division division : divisions){
            divisionsNames.add(division.getDivName());
        }

        return ResponseEntity.ok(divisionsNames);
    }

    @GetMapping("/get-users")
    private ResponseEntity<?> getAllUsers(){
        List<User> users = userRepository.findAll();

        List<UsersResponse> response = new ArrayList<>();
        for(User user : users){
            UsersResponse userResponse = new UsersResponse();

            userResponse.setId(user.getUserId());
            userResponse.setEmail(user.getEmail());
            userResponse.setService(user.getService().getServiceName());
            userResponse.setDivision(user.getService().getDivision().getDivName());

            response.add(userResponse);
        }

        return ResponseEntity.ok(response);
    }

    @PutMapping("/change-pass/{id}")
    private ResponseEntity<?> changePassword(@PathVariable("id") Long id, @RequestBody Map<String, String> requestBody){
        User user = userRepository.findById(id).orElseThrow(()-> new RuntimeException("User not found with id : " + id));
        user.setPassword(passwordEncoder.encode(requestBody.get("password")));
        userRepository.save(user);
        return ResponseEntity.ok("Password changed successfully!");
    }
}
