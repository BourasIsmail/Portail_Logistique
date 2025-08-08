package com.mdms.backend.parcauto.service;

import com.mdms.backend.parcauto.dto.MissionDto;
import com.mdms.backend.parcauto.entity.Chauffeur;
import com.mdms.backend.parcauto.entity.Mission;
import com.mdms.backend.parcauto.entity.Vehicule;
import com.mdms.backend.parcauto.enums.EtatChauffeur;
import com.mdms.backend.parcauto.enums.StatutMission;
import com.mdms.backend.parcauto.enums.StatutVehicule;
import com.mdms.backend.parcauto.repository.ChauffeurRepository;
import com.mdms.backend.parcauto.repository.MissionRepository;
import com.mdms.backend.parcauto.repository.VehiculeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class MissionService {

    @Autowired private MissionRepository missionRepository;
    @Autowired private VehiculeRepository vehiculeRepository;
    @Autowired private ChauffeurRepository chauffeurRepository;

    // --- READ  ---
    @Transactional(readOnly = true)
    public Page<MissionDto> findAll(String query, Pageable pageable) {
        Page<Mission> missionPage;
        if (query != null && !query.trim().isEmpty()) {
            missionPage = missionRepository.searchByMotifOrDestinationContainingIgnoreCase(query.trim(), pageable);
        } else {
            missionPage = missionRepository.findAllWithDetails(pageable);
        }
        return missionPage.map(this::convertToDto);
    }

    @Transactional(readOnly = true)
    public Optional<MissionDto> findById(Long id) {
        return missionRepository.findByIdWithDetails(id).map(this::convertToDto);
    }

    // --- CREATE ---
    @Transactional
    public Mission create(MissionDto dto) {
        Vehicule vehicule = vehiculeRepository.findById(dto.getVehiculeId()).orElseThrow(() -> new EntityNotFoundException("Véhicule non trouvé"));
        Chauffeur chauffeur = chauffeurRepository.findById(dto.getChauffeurId()).orElseThrow(() -> new EntityNotFoundException("Chauffeur non trouvé"));

        if (vehicule.getStatut() != StatutVehicule.EN_SERVICE) throw new IllegalStateException("Le véhicule n'est pas disponible.");
        if (chauffeur.getEtat() != EtatChauffeur.DISPONIBLE) throw new IllegalStateException("Le chauffeur n'est pas disponible.");

        vehicule.setStatut(StatutVehicule.EN_MISSION);
        chauffeur.setEtat(EtatChauffeur.EN_MISSION);
        
        Mission mission = new Mission();
        mission.setMotif(dto.getMotif());
        mission.setDestination(dto.getDestination());
        mission.setNumeroSuiviRh(dto.getNumeroSuiviRh());
        mission.setDateDebut(dto.getDateDebut());
        mission.setDateFin(dto.getDateFin());
        mission.setStatut(StatutMission.PLANIFIEE);
        mission.setKilometrageDepart(vehicule.getKilometrage());
        mission.setVehicule(vehicule);
        mission.setChauffeur(chauffeur);
        
        return missionRepository.save(mission);
    }

    // --- UPDATE ---
    @Transactional
    public Mission terminerMission(Long id, long kilometrageFin) {
        Mission mission = missionRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Mission non trouvée"));

        if (mission.getStatut() == StatutMission.TERMINEE) throw new IllegalStateException("Cette mission est déjà terminée.");
        
        mission.setStatut(StatutMission.TERMINEE);
        mission.setKilometrageFin(kilometrageFin);
        mission.setDateFin(java.time.LocalDateTime.now());

        Vehicule vehicule = mission.getVehicule();
        vehicule.setStatut(StatutVehicule.EN_SERVICE);
        vehicule.setKilometrage(kilometrageFin);

        Chauffeur chauffeur = mission.getChauffeur();
        chauffeur.setEtat(EtatChauffeur.DISPONIBLE);

        return missionRepository.save(mission);
    }
    
    @Transactional
    public Mission update(Long id, MissionDto dto) {
        Mission mission = missionRepository.findByIdWithDetails(id).orElseThrow(() -> new EntityNotFoundException("Mission non trouvée"));
        if (mission.getStatut() != StatutMission.PLANIFIEE) throw new IllegalStateException("Impossible de modifier une mission déjà démarrée.");

        Vehicule vehicule = vehiculeRepository.findById(dto.getVehiculeId()).orElseThrow(() -> new EntityNotFoundException("Véhicule non trouvé"));
        Chauffeur chauffeur = chauffeurRepository.findById(dto.getChauffeurId()).orElseThrow(() -> new EntityNotFoundException("Chauffeur non trouvé"));

        mission.setMotif(dto.getMotif());
        mission.setDestination(dto.getDestination());
        mission.setNumeroSuiviRh(dto.getNumeroSuiviRh());
        mission.setDateDebut(dto.getDateDebut());
        mission.setDateFin(dto.getDateFin());
        mission.setKilometrageDepart(vehicule.getKilometrage());
        mission.setVehicule(vehicule);
        mission.setChauffeur(chauffeur);
    
        return missionRepository.save(mission);
    }

    // --- DELETE ---
    @Transactional
    public void delete(Long id) {
        Mission mission = missionRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Mission non trouvée"));
    
        if (mission.getStatut() == StatutMission.PLANIFIEE) {
            mission.getVehicule().setStatut(StatutVehicule.EN_SERVICE);
            mission.getChauffeur().setEtat(EtatChauffeur.DISPONIBLE);
        }
        missionRepository.delete(mission);
    }
  
    private MissionDto convertToDto(Mission mission) {
        MissionDto dto = new MissionDto();
        dto.setId(mission.getId());
        dto.setMotif(mission.getMotif());
        dto.setDestination(mission.getDestination());
        dto.setNumeroSuiviRh(mission.getNumeroSuiviRh());
        dto.setDateDebut(mission.getDateDebut());
        dto.setDateFin(mission.getDateFin());
        dto.setStatut(mission.getStatut());
        dto.setKilometrageDepart(mission.getKilometrageDepart());
        dto.setKilometrageFin(mission.getKilometrageFin());
        
        if (mission.getVehicule() != null) {
            dto.setVehiculeId(mission.getVehicule().getId());
            dto.setVehiculeImmatriculation(mission.getVehicule().getImmatriculation());
        }
        if (mission.getChauffeur() != null) {
            dto.setChauffeurId(mission.getChauffeur().getId());
            dto.setChauffeurNomComplet(mission.getChauffeur().getPrenom() + " " + mission.getChauffeur().getNom());
        }
        return dto;
    }
}