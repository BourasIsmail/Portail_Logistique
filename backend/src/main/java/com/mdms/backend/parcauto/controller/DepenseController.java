package com.mdms.backend.parcauto.controller;

import com.mdms.backend.parcauto.dto.DepenseDto;
import com.mdms.backend.parcauto.entity.Depense;
import com.mdms.backend.parcauto.service.DepenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/parcauto/depenses")
public class DepenseController {

    @Autowired
    private DepenseService depenseService;

    @GetMapping
    public ResponseEntity<List<DepenseDto>> getAllDepenses() {
        return ResponseEntity.ok(depenseService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepenseDto> getDepenseById(@PathVariable Long id) {
        return depenseService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Depense> createDepense(@RequestBody DepenseDto dto) {
        Depense nouvelleDepense = depenseService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nouvelleDepense);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepense(@PathVariable Long id) {
        depenseService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Depense> updateDepense(@PathVariable Long id, @RequestBody DepenseDto dto) {
        Depense depenseMiseAJour = depenseService.update(id, dto);
        return ResponseEntity.ok(depenseMiseAJour);
    }
    
}