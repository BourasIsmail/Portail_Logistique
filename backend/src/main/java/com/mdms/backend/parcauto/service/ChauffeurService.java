package com.mdms.backend.parcauto.service;

import com.mdms.backend.parcauto.dto.ChauffeurDto;
import com.mdms.backend.parcauto.entity.CentreRattachement;
import com.mdms.backend.parcauto.entity.Chauffeur;
import com.mdms.backend.parcauto.enums.EtatChauffeur;
import com.mdms.backend.parcauto.repository.CentreRattachementRepository;
import com.mdms.backend.parcauto.repository.ChauffeurRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.transaction.annotation.Transactional;
@Service
public class ChauffeurService {

    @Autowired
    private ChauffeurRepository chauffeurRepository;

    @Autowired
    private CentreRattachementRepository centreRepository;

    // --- READ ---
       @Transactional(readOnly = true)
    public Page<ChauffeurDto> findAll(String query, Pageable pageable) {
        Page<Chauffeur> chauffeurPage;
        if (query != null && !query.trim().isEmpty()) {
            chauffeurPage = chauffeurRepository.searchByNomOrPrenomContainingIgnoreCase(query.trim(), pageable);
        } else {
           chauffeurPage = chauffeurRepository.findAllWithDetails(pageable);
        }
        return chauffeurPage.map(this::convertToDto);
    }

    public Optional<ChauffeurDto> findById(Long id) {
        return chauffeurRepository.findById(id).map(this::convertToDto);
    }

    // --- CREATE ---
    public Chauffeur create(ChauffeurDto dto) {
        Chauffeur chauffeur = new Chauffeur();
        
        
        chauffeur.setNom(dto.getNom());
        chauffeur.setPrenom(dto.getPrenom());
        chauffeur.setAge(dto.getAge());
        chauffeur.setEtat(dto.getEtat());
        chauffeur.setTypePermis(dto.getTypePermis());
        chauffeur.setStable(dto.isStable());

        
        CentreRattachement centre = centreRepository.findById(dto.getCentreRattachementId())
                .orElseThrow(() -> new EntityNotFoundException("Centre de Rattachement non trouvé avec l'ID : " + dto.getCentreRattachementId()));
        chauffeur.setCentreRattachement(centre);

        return chauffeurRepository.save(chauffeur);
    }

    // --- UPDATE ---
    public Chauffeur update(Long id, ChauffeurDto dto) {
        Chauffeur chauffeur = chauffeurRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Chauffeur non trouvé avec l'ID : " + id));

      
        chauffeur.setNom(dto.getNom());
        chauffeur.setPrenom(dto.getPrenom());
        chauffeur.setAge(dto.getAge());
        chauffeur.setEtat(dto.getEtat());
        chauffeur.setTypePermis(dto.getTypePermis());
        chauffeur.setStable(dto.isStable());

    
        CentreRattachement centre = centreRepository.findById(dto.getCentreRattachementId())
                .orElseThrow(() -> new EntityNotFoundException("Centre de Rattachement non trouvé avec l'ID : " + dto.getCentreRattachementId()));
        chauffeur.setCentreRattachement(centre);

        return chauffeurRepository.save(chauffeur);
    }

    // --- DELETE ---
    public void delete(Long id) {
        Chauffeur chauffeur = chauffeurRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Chauffeur non trouvé avec l'ID : " + id));
        
        // Ajout d'une vérification métier : on ne peut pas supprimer un chauffeur s'il a des missions
        if (!chauffeur.getMissions().isEmpty()) {
            throw new IllegalStateException("Impossible de supprimer le chauffeur car il est encore assigné à des missions.");
        }

        chauffeurRepository.deleteById(id);
    }

    // --- UTILITAIRE DE CONVERSION ---
    private ChauffeurDto convertToDto(Chauffeur chauffeur) {
        ChauffeurDto dto = new ChauffeurDto();
        dto.setId(chauffeur.getId());
        dto.setNom(chauffeur.getNom());
        dto.setPrenom(chauffeur.getPrenom());
        dto.setAge(chauffeur.getAge());
        dto.setEtat(chauffeur.getEtat());
        dto.setTypePermis(chauffeur.getTypePermis());
        dto.setStable(chauffeur.isStable());
        if (chauffeur.getCentreRattachement() != null) {
            dto.setCentreRattachementId(chauffeur.getCentreRattachement().getId());
            dto.setCentreRattachementNom(chauffeur.getCentreRattachement().getNom());
        }
        return dto;
    }

        // --- Méthode de mapping partagée ---
    private void mapDtoToEntity(ChauffeurDto dto, Chauffeur chauffeur) {
        chauffeur.setNom(dto.getNom());
        chauffeur.setPrenom(dto.getPrenom());
        chauffeur.setAge(dto.getAge());
        chauffeur.setEtat(dto.getEtat());
        chauffeur.setTypePermis(dto.getTypePermis());
        chauffeur.setStable(dto.isStable());

        CentreRattachement centre = centreRepository.findById(dto.getCentreRattachementId())
                .orElseThrow(() -> new EntityNotFoundException("Centre de Rattachement non trouvé avec l'ID : " + dto.getCentreRattachementId()));
        chauffeur.setCentreRattachement(centre);
    }
       @Transactional(readOnly = true)
    public List<ChauffeurDto> findAllForSelect() {
        return chauffeurRepository.findAll(Sort.by("nom").ascending()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    public List<ChauffeurDto> findChauffeursDisponibles() {
    return chauffeurRepository.findByEtat(EtatChauffeur.DISPONIBLE)
            .stream().map(this::convertToDto).collect(Collectors.toList());
}


@Transactional(readOnly = true)
public List<ChauffeurDto> findChauffeursDisponiblesByCentre(String nomCentre) {
    // Utilise la nouvelle méthode du repository
    return chauffeurRepository.findByEtatAndCentreRattachement_Nom(EtatChauffeur.DISPONIBLE, nomCentre)
            .stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
}
}