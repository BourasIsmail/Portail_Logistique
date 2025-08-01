package com.mdms.backend.parcauto.controller;

import com.mdms.backend.parcauto.dto.VehiculeDto;
import com.mdms.backend.parcauto.entity.Vehicule;
import com.mdms.backend.parcauto.service.VehiculeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable; 
@RestController
@RequestMapping("/api/admin/parcauto/vehicules")
public class VehiculeController {

    @Autowired
    private VehiculeService vehiculeService;


     @GetMapping
public ResponseEntity<Page<VehiculeDto>> getAllVehicules(
        @RequestParam(required = false) String query, 
        Pageable pageable
) {
    Page<VehiculeDto> vehiculePage = vehiculeService.findAllPaginated(query, pageable);
    return ResponseEntity.ok(vehiculePage);
}


    @GetMapping("/{id}")
    public ResponseEntity<VehiculeDto> getVehiculeById(@PathVariable Long id) {
        return vehiculeService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<Vehicule> createVehicule(@Valid @RequestBody VehiculeDto dto) {
        Vehicule nouveauVehicule = vehiculeService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nouveauVehicule);
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<Vehicule> updateVehicule(@PathVariable Long id, @Valid @RequestBody VehiculeDto dto) {
        Vehicule vehiculeMisAJour = vehiculeService.update(id, dto);
        return ResponseEntity.ok(vehiculeMisAJour);
    }

   
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicule(@PathVariable Long id) {
        vehiculeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}