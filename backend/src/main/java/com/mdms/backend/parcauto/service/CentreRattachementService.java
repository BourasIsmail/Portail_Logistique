package com.mdms.backend.parcauto.service;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mdms.backend.parcauto.dto.CentreRattachementDto;



import com.mdms.backend.parcauto.entity.CentreRattachement;
import com.mdms.backend.parcauto.entity.Region;
import com.mdms.backend.parcauto.repository.CentreRattachementRepository;
import com.mdms.backend.parcauto.repository.RegionRepository;

import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
public class CentreRattachementService {

    @Autowired
    private CentreRattachementRepository centreRepository;

    public Optional<CentreRattachementDto> findCentreByIdAsDto(Long id) {
        Optional<CentreRattachement> centreOptional = centreRepository.findById(id);
        return centreOptional.map(this::convertToDto);
    }

    //liister les centres de rattachement
    public List<CentreRattachementDto>  findAllCentresAsDto() {

        return centreRepository.findAll()
        .stream()
        .map(this::convertToDto)
        .collect(Collectors.toList());
    }
     private CentreRattachementDto convertToDto(CentreRattachement centre) {
        CentreRattachementDto dto = new CentreRattachementDto();
        dto.setId(centre.getId());
        dto.setNom(centre.getNom());
        dto.setVille(centre.getVille());
        
        if(centre.getRegion()!= null){
            dto.setRegion_id(centre.getRegion().getId());
            dto.setRegionNom(centre.getRegion().getNomFr());
        }

        return dto;
     }

     //creation d'un centre de rattachement
         @Autowired
     private RegionRepository regionRepository;
     public CentreRattachement createCentre(CentreRattachementDto dto){
        CentreRattachement centre = new CentreRattachement();
         centre.setNom(dto.getNom());
         centre.setVille(dto.getVille());

          Region region = regionRepository.findById(dto.getRegion_id())
            .orElseThrow(() -> new RuntimeException("Région non trouvée avec l'id : " + dto.getRegion_id()));

        centre.setRegion(region);

        return centreRepository.save(centre);
     }
      // chercher les centre de rattachemnet par region
      public List<CentreRattachementDto> findCentresByRegionId(Long regionId) {
        List<CentreRattachement> centres = centreRepository.findByRegionId(regionId);
        return centres.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
      }

          // --- UPDATE ---
    public CentreRattachement updateCentre(Long id, CentreRattachementDto dto) {
        CentreRattachement centre = centreRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Centre non trouvé avec l'id : " + id));

        Region region = regionRepository.findById(dto.getRegion_id())
                .orElseThrow(() -> new EntityNotFoundException("Région non trouvée avec l'id : " + dto.getRegion_id()));

        centre.setNom(dto.getNom());
        centre.setVille(dto.getVille());
        centre.setRegion(region);

        return centreRepository.save(centre);
    }

    // --- DELETE ---
    public void deleteCentre(Long id) {
        if (!centreRepository.existsById(id)) {
            throw new EntityNotFoundException("Centre non trouvé avec l'id : " + id);
        }
        centreRepository.deleteById(id);
    }


}
