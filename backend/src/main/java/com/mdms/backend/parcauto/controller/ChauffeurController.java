package com.mdms.backend.parcauto.controller;

import com.mdms.backend.parcauto.dto.ChauffeurDto;
import com.mdms.backend.parcauto.entity.Chauffeur;
import com.mdms.backend.parcauto.service.ChauffeurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/admin/parcauto/chauffeurs")
public class ChauffeurController {

    @Autowired
    private ChauffeurService chauffeurService;

    @GetMapping
    public ResponseEntity<List<ChauffeurDto>> getAllChauffeurs() {
        return ResponseEntity.ok(chauffeurService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChauffeurDto> getChauffeurById(@PathVariable Long id) {
        return chauffeurService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<Chauffeur> createChauffeur(@Valid @RequestBody ChauffeurDto dto) {
        Chauffeur nouveauChauffeur = chauffeurService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nouveauChauffeur);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Chauffeur> updateChauffeur(@PathVariable Long id,@Valid @RequestBody ChauffeurDto dto) {
        Chauffeur chauffeurMisAJour = chauffeurService.update(id, dto);
        return ResponseEntity.ok(chauffeurMisAJour);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChauffeur(@PathVariable Long id) {
        chauffeurService.delete(id);
        return ResponseEntity.noContent().build();
    }
}