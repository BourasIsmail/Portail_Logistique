package com.mdms.backend.parcauto.service;

import com.mdms.backend.parcauto.dto.CentreRattachementDto;
import com.mdms.backend.parcauto.entity.CentreRattachement;
import com.mdms.backend.parcauto.entity.Region;
import com.mdms.backend.parcauto.repository.CentreRattachementRepository;
import com.mdms.backend.parcauto.repository.RegionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CentreRattachementService {

    @Autowired
    private CentreRattachementRepository centreRepository;
    
    @Autowired
    private RegionRepository regionRepository;

    // --- READ ---

    public Page<CentreRattachementDto> findAllPaginated(Pageable pageable) {
        return centreRepository.findAll(pageable).map(this::convertToDto);
    }

    public List<CentreRattachementDto> findAllForSelect() {
        return centreRepository.findAll(Sort.by("nom").ascending()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public Optional<CentreRattachementDto> findCentreByIdAsDto(Long id) {
        return centreRepository.findById(id).map(this::convertToDto);
    }

    public List<CentreRattachementDto> findCentresByRegionId(Long regionId) {
        return centreRepository.findByRegionId(regionId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // --- CREATE ---
    public CentreRattachement createCentre(CentreRattachementDto dto) {
        CentreRattachement centre = new CentreRattachement();
        centre.setNom(dto.getNom());
        centre.setVille(dto.getVille());

        Region region = regionRepository.findById(dto.getRegionId()) // Correction de nom
                .orElseThrow(() -> new EntityNotFoundException("Région non trouvée avec l'id : " + dto.getRegionId()));

        centre.setRegion(region);
        return centreRepository.save(centre);
    }

    // --- UPDATE ---
    public CentreRattachement updateCentre(Long id, CentreRattachementDto dto) {
        CentreRattachement centre = centreRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Centre non trouvé avec l'id : " + id));

        Region region = regionRepository.findById(dto.getRegionId()) // Correction de nom
                .orElseThrow(() -> new EntityNotFoundException("Région non trouvée avec l'id : " + dto.getRegionId()));

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

    // --- UTILITAIRE DE CONVERSION ---
    private CentreRattachementDto convertToDto(CentreRattachement centre) {
        CentreRattachementDto dto = new CentreRattachementDto();
        dto.setId(centre.getId());
        dto.setNom(centre.getNom());
        dto.setVille(centre.getVille());
        
        if (centre.getRegion() != null) {
            dto.setRegionId(centre.getRegion().getId()); 
            dto.setRegionNom(centre.getRegion().getNomFr());
        }
        return dto;
    }
}