package com.mdms.backend.parcauto.controller;

import com.mdms.backend.parcauto.dto.MissionDto;
import com.mdms.backend.parcauto.entity.Mission;
import com.mdms.backend.parcauto.service.MissionService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/parcauto/missions")
public class MissionController {

    @Autowired
    private MissionService missionService;

    
    @GetMapping
    public ResponseEntity<List<MissionDto>> getAllMissions() {
        return ResponseEntity.ok(missionService.findAll());
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<MissionDto> getMissionById(@PathVariable Long id) {
        return missionService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<Mission> updateMission(@PathVariable Long id, @RequestBody MissionDto dto) {
        
        Mission missionMiseAJour = missionService.update(id, dto);
        return ResponseEntity.ok(missionMiseAJour);
    }
    
    @PostMapping
    public ResponseEntity<Mission> createMission(@Valid @RequestBody MissionDto dto) {
        Mission nouvelleMission = missionService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nouvelleMission);
    }

// Cet endpoint est le "bouton" virtuel que le gestionnaire appuie pour clôturer une mission, en fournissant la dernière information manquante : le kilométrage final.

    @PutMapping("/{id}/terminer")
    public ResponseEntity<Mission> terminerMission(@PathVariable Long id, @Valid @RequestBody Map<String, Long> payload) {
        Long kilometrageFin = payload.get("kilometrageFin");
        if (kilometrageFin == null) {
            return ResponseEntity.badRequest().build(); 
        }
        Mission missionTerminee = missionService.terminerMission(id, kilometrageFin);
        return ResponseEntity.ok(missionTerminee);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMission(@PathVariable Long id) {
        missionService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
}