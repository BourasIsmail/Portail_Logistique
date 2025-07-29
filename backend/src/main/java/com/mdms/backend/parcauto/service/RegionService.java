package com.mdms.backend.parcauto.service;
import com.mdms.backend.parcauto.entity.Region;
import com.mdms.backend.parcauto.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors; import java.util.Optional;

import com.mdms.backend.parcauto.dto.RegionDto;
import jakarta.persistence.EntityNotFoundException;

@Service 
public class RegionService {
     
    @Autowired // Spring va injecter automatiquement une instance de RegionRepository
    private RegionRepository regionRepository;


    //Lister
    public List<RegionDto> findAllRegionsAsDto() {
        return regionRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

        private RegionDto convertToDto(Region region) {
        RegionDto dto = new RegionDto();
        dto.setId(region.getId());
        dto.setCode(region.getCode());
        dto.setNomFr(region.getNomFr());
        dto.setNomAr(region.getNomAr());
        return dto;
    }


       public Optional<RegionDto> findRegionByIdAsDto(Long id) {

        Optional<Region> regionOptional = regionRepository.findById(id);
    
        return regionOptional.map(this::convertToDto);}

      // --- CREATE ---
    public Region createRegion(RegionDto regionDto) {
        Region region = new Region();
        region.setCode(regionDto.getCode());
        region.setNomFr(regionDto.getNomFr());
        region.setNomAr(regionDto.getNomAr());
        return regionRepository.save(region);
    }
      // --- UPDATE ---
    public Region updateRegion(Long id, RegionDto regionDetails) {
        Region region = regionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Région non trouvée avec l'id : " + id));
        
        region.setCode(regionDetails.getCode());
        region.setNomFr(regionDetails.getNomFr());
        region.setNomAr(regionDetails.getNomAr());
        
        return regionRepository.save(region);
    }


        // --- DELETE ---
    public void deleteRegion(Long id) {
        if (!regionRepository.existsById(id)) {
            throw new EntityNotFoundException("Région non trouvée avec l'id : " + id);
        }
        regionRepository.deleteById(id);
    }
}
