package com.mdms.backend.parcauto.service;

import com.mdms.backend.parcauto.dto.VehiculeDto;
import com.mdms.backend.parcauto.entity.CentreRattachement;
import com.mdms.backend.parcauto.entity.Chauffeur;
import com.mdms.backend.parcauto.entity.Vehicule;
import com.mdms.backend.parcauto.repository.CentreRattachementRepository;
import com.mdms.backend.parcauto.repository.ChauffeurRepository;
import com.mdms.backend.parcauto.repository.VehiculeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VehiculeService {

    @Autowired private VehiculeRepository vehiculeRepository;
    @Autowired private CentreRattachementRepository centreRepository;
    @Autowired private ChauffeurRepository chauffeurRepository;

    // --- READ ---
    @Transactional(readOnly = true) 
    public List<VehiculeDto> findAll() {
        return vehiculeRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<VehiculeDto> findById(Long id) {
        return vehiculeRepository.findById(id).map(this::convertToDto);
    }

    // --- CREATE ---
    @Transactional
    public Vehicule create(VehiculeDto dto) {
        Vehicule vehicule = new Vehicule();
        mapDtoToEntity(dto, vehicule);
        return vehiculeRepository.save(vehicule);
    }

    // --- UPDATE ---
    @Transactional
    public Vehicule update(Long id, VehiculeDto dto) {
        Vehicule vehicule = vehiculeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Véhicule non trouvé avec l'ID : " + id));
        mapDtoToEntity(dto, vehicule);
        return vehiculeRepository.save(vehicule);
    }

    // --- DELETE ---
    @Transactional
    public void delete(Long id) {
        Vehicule vehicule = vehiculeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Véhicule non trouvé avec l'ID : " + id));
        
        
        if (vehicule.getMissions() != null && !vehicule.getMissions().isEmpty()) {
            throw new IllegalStateException("Impossible de supprimer le véhicule car il est encore assigné à des missions.");
        }

        vehiculeRepository.deleteById(id);
    }

  
    private void mapDtoToEntity(VehiculeDto dto, Vehicule vehicule) {
        vehicule.setImmatriculation(dto.getImmatriculation());
        vehicule.setMarque(dto.getMarque());
        vehicule.setModele(dto.getModele());
        vehicule.setGenre(dto.getGenre());
        vehicule.setTypeCarburant(dto.getTypeCarburant());
        vehicule.setPuissanceFiscale(dto.getPuissanceFiscale());
        vehicule.setDateMiseEnCirculation(dto.getDateMiseEnCirculation());
        vehicule.setStatut(dto.getStatut());
        vehicule.setKilometrage(dto.getKilometrage());
        vehicule.setDateExpirationAssurance(dto.getDateExpirationAssurance());
        vehicule.setDateProchainControleTechnique(dto.getDateProchainControleTechnique());
        vehicule.setAFaitAccident(dto.isAFaitAccident());
        vehicule.setEtat(dto.getEtat());
        vehicule.setObservations(dto.getObservations());

        
        CentreRattachement centre = centreRepository.findById(dto.getCentreRattachementId())
                .orElseThrow(() -> new EntityNotFoundException("Centre non trouvé avec l'ID : " + dto.getCentreRattachementId()));
        vehicule.setCentreRattachement(centre);

        
        if (dto.getChauffeurAttitreId() != null) {
            Chauffeur chauffeur = chauffeurRepository.findById(dto.getChauffeurAttitreId())
                    .orElseThrow(() -> new EntityNotFoundException("Chauffeur attitré non trouvé avec l'ID : " + dto.getChauffeurAttitreId()));
            vehicule.setChauffeurAttitre(chauffeur);
        } else {
            vehicule.setChauffeurAttitre(null); 
        }
    }

    private VehiculeDto convertToDto(Vehicule vehicule) {
        VehiculeDto dto = new VehiculeDto();
        dto.setId(vehicule.getId());
        dto.setImmatriculation(vehicule.getImmatriculation());
        dto.setMarque(vehicule.getMarque());
        dto.setModele(vehicule.getModele());
        dto.setGenre(vehicule.getGenre());
        dto.setTypeCarburant(vehicule.getTypeCarburant());
        dto.setPuissanceFiscale(vehicule.getPuissanceFiscale());
        dto.setDateMiseEnCirculation(vehicule.getDateMiseEnCirculation());
        dto.setStatut(vehicule.getStatut());
        dto.setKilometrage(vehicule.getKilometrage());
        dto.setDateExpirationAssurance(vehicule.getDateExpirationAssurance());
        dto.setDateProchainControleTechnique(vehicule.getDateProchainControleTechnique());
        dto.setAFaitAccident(vehicule.isAFaitAccident());
        dto.setEtat(vehicule.getEtat());
        dto.setObservations(vehicule.getObservations());

        if (vehicule.getCentreRattachement() != null) {
            dto.setCentreRattachementId(vehicule.getCentreRattachement().getId());
            dto.setCentreRattachementNom(vehicule.getCentreRattachement().getNom());
        }
        if (vehicule.getChauffeurAttitre() != null) {
            dto.setChauffeurAttitreId(vehicule.getChauffeurAttitre().getId());
            dto.setChauffeurAttitreNomComplet(vehicule.getChauffeurAttitre().getPrenom() + " " + vehicule.getChauffeurAttitre().getNom());
        }
        return dto;
    }
}