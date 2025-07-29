package com.mdms.backend.parcauto.controller;
import com.mdms.backend.parcauto.service.RegionService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.mdms.backend.parcauto.dto.RegionDto;
import java.util.List;
import com.mdms.backend.parcauto.dto.CentreRattachementDto;
import com.mdms.backend.parcauto.service.CentreRattachementService;
import org.springframework.web.bind.annotation.*;
import com.mdms.backend.parcauto.entity.Region;

@RestController
@RequestMapping("/api/admin/parcauto")
public class RegionController {

    @Autowired
    private RegionService regionService;

     @Autowired
    private CentreRattachementService centreService;

    @GetMapping("/regions")
    public ResponseEntity<List<RegionDto>> getAllRegions() {
        List<RegionDto> regions = regionService.findAllRegionsAsDto();
        return ResponseEntity.ok(regions);

    }

    @GetMapping("/regions/{id}")
       public ResponseEntity<RegionDto> getRegionById(@PathVariable Long id) {
        return regionService.findRegionByIdAsDto(id)
                .map(regionDto -> ResponseEntity.ok(regionDto)) 
                .orElse(ResponseEntity.notFound().build());     
    }

    @GetMapping("/{regionId}/centres")
       public ResponseEntity<List<CentreRattachementDto>> getCentresByRegion(@PathVariable Long regionId) {
        List<CentreRattachementDto> centres = centreService.findCentresByRegionId(regionId);
        return ResponseEntity.ok(centres);
    }

     @PostMapping("/regions")
    public ResponseEntity<Region> createRegion(@Valid @RequestBody RegionDto regionDto) {
        Region nouvelleRegion = regionService.createRegion(regionDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nouvelleRegion);
    }

      @PutMapping("/regions/{id}")
    public ResponseEntity<Region> updateRegion(@PathVariable Long id,@Valid @RequestBody RegionDto regionDto) {
        Region regionMiseAJour = regionService.updateRegion(id, regionDto);
        return ResponseEntity.ok(regionMiseAJour);
    }

        @DeleteMapping("/regions/{id}")
    public ResponseEntity<Void> deleteRegion(@PathVariable Long id) {
        regionService.deleteRegion(id);
        return ResponseEntity.noContent().build();
    }

}