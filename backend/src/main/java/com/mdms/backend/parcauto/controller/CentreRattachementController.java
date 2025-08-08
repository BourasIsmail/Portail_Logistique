package com.mdms.backend.parcauto.controller;

import com.mdms.backend.parcauto.dto.CentreRattachementDto;
import com.mdms.backend.parcauto.entity.CentreRattachement;
import com.mdms.backend.parcauto.service.CentreRattachementService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;

@RestController
@RequestMapping("/api/admin/parcauto/centres")
public class CentreRattachementController {

    @Autowired
    private CentreRattachementService centreService;

    @GetMapping
    public ResponseEntity<Page<CentreRattachementDto>> getAllCentres(Pageable pageable) {
        Page<CentreRattachementDto> centres = centreService.findAllPaginated(pageable);
        return ResponseEntity.ok(centres);
    }

    @GetMapping("/liste-complete")
    public ResponseEntity<List<CentreRattachementDto>> getAllCentresForSelect() {
        return ResponseEntity.ok(centreService.findAllForSelect());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CentreRattachementDto> getCentreById(@PathVariable Long id) {
        return centreService.findCentreByIdAsDto(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CentreRattachement> createCentre(@Valid @RequestBody CentreRattachementDto dto) {
        CentreRattachement nouveauCentre = centreService.createCentre(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nouveauCentre);
    }


    @PutMapping("/{id}")
    public ResponseEntity<CentreRattachement> updateCentre(@PathVariable Long id, @Valid @RequestBody CentreRattachementDto dto) {
        CentreRattachement centreMisAJour = centreService.updateCentre(id, dto);
        return ResponseEntity.ok(centreMisAJour);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteCentre(@PathVariable Long id) {
        centreService.deleteCentre(id);
        return ResponseEntity.noContent().build();
    }
}