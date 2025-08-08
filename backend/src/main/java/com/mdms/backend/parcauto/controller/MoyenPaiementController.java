package com.mdms.backend.parcauto.controller;

import com.mdms.backend.parcauto.dto.MoyenPaiementDto;
import com.mdms.backend.parcauto.entity.MoyenPaiement;
import com.mdms.backend.parcauto.service.MoyenPaiementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/parcauto/moyens-paiement")
public class MoyenPaiementController {

    @Autowired
    private MoyenPaiementService moyenPaiementService;


    @GetMapping
    public ResponseEntity<Page<MoyenPaiementDto>> getAllMoyensPaiement(
            @RequestParam(required = false) String query,
            Pageable pageable) {
        Page<MoyenPaiementDto> page = moyenPaiementService.findAll(query, pageable);
        return ResponseEntity.ok(page);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<MoyenPaiementDto>> getAllMoyensPaiementForSelect() {
        return ResponseEntity.ok(moyenPaiementService.findAllForSelect());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MoyenPaiementDto> getMoyenPaiementById(@PathVariable Long id) {
        return moyenPaiementService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MoyenPaiement> createMoyenPaiement(@RequestBody MoyenPaiementDto dto) {
        MoyenPaiement nouveauMoyenPaiement = moyenPaiementService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nouveauMoyenPaiement);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<MoyenPaiement> updateMoyenPaiement(@PathVariable Long id, @RequestBody MoyenPaiementDto dto) {
         
         MoyenPaiement moyenMiseAjour = moyenPaiementService.Update(id, dto);
         return ResponseEntity.ok(moyenMiseAjour);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteMoyenPaiement(@PathVariable Long id) {
        moyenPaiementService.delete(id);
        return ResponseEntity.noContent().build();
    }
}