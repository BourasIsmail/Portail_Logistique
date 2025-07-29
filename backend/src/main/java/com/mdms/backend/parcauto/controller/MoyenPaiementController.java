package com.mdms.backend.parcauto.controller;

import com.mdms.backend.parcauto.dto.MoyenPaiementDto;
import com.mdms.backend.parcauto.entity.MoyenPaiement;
import com.mdms.backend.parcauto.service.MoyenPaiementService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/parcauto/moyens-paiement")
public class MoyenPaiementController {

    @Autowired
    private MoyenPaiementService moyenPaiementService;

    
    @GetMapping
    public ResponseEntity<List<MoyenPaiementDto>> getAllMoyensPaiement() {
        return ResponseEntity.ok(moyenPaiementService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MoyenPaiementDto> getMoyenPaiementById(@PathVariable Long id) {
        return moyenPaiementService.findById(id)
                .map(ResponseEntity::ok)
                // Si l'Optional n'est pas vide, applique ResponseEntity.ok()
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MoyenPaiement> createMoyenPaiement(@RequestBody MoyenPaiementDto dto) {
        MoyenPaiement nouveauMoyenPaiement = moyenPaiementService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nouveauMoyenPaiement);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMoyenPaiement(@PathVariable Long id) {
        moyenPaiementService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<MoyenPaiement> UpdateMoyenPaiemment(@PathVariable Long id, @RequestBody MoyenPaiementDto dto){
         MoyenPaiement moyenMiseAjour = moyenPaiementService.Update(id, dto);
         return ResponseEntity.ok(moyenMiseAjour);

    }
}