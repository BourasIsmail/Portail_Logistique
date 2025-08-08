package com.mdms.backend.parcauto.controller;

import com.mdms.backend.parcauto.dto.MissionDto;
import com.mdms.backend.parcauto.entity.Mission;
import com.mdms.backend.parcauto.service.MissionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List; 
import java.util.Map;

@RestController
@RequestMapping("/api/admin/parcauto/missions")
public class MissionController {

    @Autowired
    private MissionService missionService;

    // GET /api/admin/parcauto/missions (paginé et avec recherche)
    @GetMapping
    public ResponseEntity<Page<MissionDto>> getAllMissions(
        @RequestParam(required = false) String query,
        Pageable pageable
    ) {
        Page<MissionDto> missionsPage = missionService.findAll(query, pageable);
        return ResponseEntity.ok(missionsPage);
    }

    // GET /api/admin/parcauto/missions/{id}
    @GetMapping("/{id}")
    public ResponseEntity<MissionDto> getMissionById(@PathVariable Long id) {
        return missionService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/admin/parcauto/missions
    @PostMapping
    public ResponseEntity<Mission> createMission(@Valid @RequestBody MissionDto dto) {
        Mission nouvelleMission = missionService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nouvelleMission);
    }

    // PUT /api/admin/parcauto/missions/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Mission> updateMission(@PathVariable Long id, @Valid @RequestBody MissionDto dto) {
        Mission missionMiseAJour = missionService.update(id, dto);
        return ResponseEntity.ok(missionMiseAJour);
    }
    
    // PUT /api/admin/parcauto/missions/{id}/terminer
    @PutMapping("/{id}/terminer")
    public ResponseEntity<Mission> terminerMission(@PathVariable Long id, @RequestBody Map<String, Long> payload) { 
        Long kilometrageFin = payload.get("kilometrageFin");
        if (kilometrageFin == null) {
            return ResponseEntity.badRequest().body(null); 
        }
        Mission missionTerminee = missionService.terminerMission(id, kilometrageFin);
        return ResponseEntity.ok(missionTerminee);
    }

    // DELETE /api/admin/parcauto/missions/{id}
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteMission(@PathVariable Long id) {
        missionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}