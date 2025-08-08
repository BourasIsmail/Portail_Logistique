package com.mdms.backend.parcauto.controller;
import com.mdms.backend.parcauto.dto.ChauffeurDto;
import com.mdms.backend.parcauto.entity.Chauffeur;
import com.mdms.backend.parcauto.service.ChauffeurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page; 
import org.springframework.data.domain.Pageable;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/admin/parcauto/chauffeurs")
public class ChauffeurController {

    @Autowired
    private ChauffeurService chauffeurService;

    @GetMapping
    public ResponseEntity<Page<ChauffeurDto>> getAllChauffeurs(
            @RequestParam(required = false) String query,
            Pageable pageable
    ) {
        Page<ChauffeurDto> chauffeurPage = chauffeurService.findAll(query, pageable);
        return ResponseEntity.ok(chauffeurPage);
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
    @PreAuthorize("hasAuthority('ROLE_ADMIN')") 
    public ResponseEntity<Void> deleteChauffeur(@PathVariable Long id) {
        chauffeurService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<ChauffeurDto>> getAllChauffeursForSelect() {
        return ResponseEntity.ok(chauffeurService.findAllForSelect());
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<ChauffeurDto>> getChauffeursDisponibles(
        @RequestParam(name = "centre", required = false) String nomCentre
    ) {
        List<ChauffeurDto> chauffeurs;
        if (nomCentre != null && !nomCentre.trim().isEmpty()) {
            // Si le paramètre "centre" est fourni, on filtre
            chauffeurs = chauffeurService.findChauffeursDisponiblesByCentre(nomCentre);
        } else {
            // Sinon, on retourne tous les chauffeurs disponibles
            chauffeurs = chauffeurService.findChauffeursDisponibles();
        }
        return ResponseEntity.ok(chauffeurs);
    }
}