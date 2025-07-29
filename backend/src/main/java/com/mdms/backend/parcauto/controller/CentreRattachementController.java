package com.mdms.backend.parcauto.controller;

import com.mdms.backend.parcauto.dto.CentreRattachementDto;
import com.mdms.backend.parcauto.entity.CentreRattachement;
import com.mdms.backend.parcauto.service.CentreRattachementService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/parcauto")
public class CentreRattachementController {

    @Autowired
    private CentreRattachementService centreService;

    @GetMapping("/centres")
    public ResponseEntity<List<CentreRattachementDto>> getAllCentres() {
        List<CentreRattachementDto> centres = centreService.findAllCentresAsDto();
        return ResponseEntity.ok(centres);
    }

    @GetMapping("/centres/{id}")
    public ResponseEntity<CentreRattachementDto> getCentreById(@PathVariable Long id) {
        return centreService.findCentreByIdAsDto(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

     @PostMapping("/centres")
    public ResponseEntity<CentreRattachement> createCentre(@Valid @RequestBody CentreRattachementDto dto) {
        CentreRattachement nouveauCentre = centreService.createCentre(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nouveauCentre);
    }

    @PutMapping("/centres/{id}")
    public ResponseEntity<CentreRattachement> updateCentre(@PathVariable Long id,@Valid @RequestBody CentreRattachementDto dto) {
        CentreRattachement centreMisAJour = centreService.updateCentre(id, dto);
        return ResponseEntity.ok(centreMisAJour);
    }

     @DeleteMapping("/centres/{id}")
    public ResponseEntity<Void> deleteCentre(@PathVariable Long id) {
        centreService.deleteCentre(id);
        return ResponseEntity.noContent().build();
    }
 
}