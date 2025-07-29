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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MissionService {

    @Autowired private MissionRepository missionRepository;
    @Autowired private VehiculeRepository vehiculeRepository;
    @Autowired private ChauffeurRepository chauffeurRepository;

    // --- READ ---
    @Transactional(readOnly = true)
    public List<MissionDto> findAll() {
        return missionRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<MissionDto> findById(Long id) {
        return missionRepository.findById(id).map(this::convertToDto);
    }

    // --- CREATE ---
    @Transactional
    public Mission create(MissionDto dto) {
        
        Vehicule vehicule = vehiculeRepository.findById(dto.getVehiculeId())
                .orElseThrow(() -> new EntityNotFoundException("Véhicule non trouvé"));
        Chauffeur chauffeur = chauffeurRepository.findById(dto.getChauffeurId())
                .orElseThrow(() -> new EntityNotFoundException("Chauffeur non trouvé"));

       
        if (vehicule.getStatut() != StatutVehicule.EN_SERVICE) {
            throw new IllegalStateException("Le véhicule n'est pas disponible pour une mission.");
        }
        if (chauffeur.getEtat() != EtatChauffeur.DISPONIBLE) {
            throw new IllegalStateException("Le chauffeur n'est pas disponible pour une mission.");
        }

        
        Mission mission = new Mission();
        mission.setMotif(dto.getMotif());
        mission.setDestination(dto.getDestination());
        mission.setDateDebut(dto.getDateDebut());
        mission.setDateFin(dto.getDateFin());
        mission.setStatut(StatutMission.PLANIFIEE); 
        mission.setKilometrageDepart(vehicule.getKilometrage()); 
        
        mission.setVehicule(vehicule);
        mission.setChauffeur(chauffeur);

        // 4. Mettre à jour les statuts des entités liées
        vehicule.setStatut(StatutVehicule.EN_MISSION);
        chauffeur.setEtat(EtatChauffeur.EN_MISSION);
        vehiculeRepository.save(vehicule);
        chauffeurRepository.save(chauffeur);
        
        // 5. Sauvegarder la mission
        return missionRepository.save(mission);
    }

    // --- UPDATE ---1
    @Transactional
    public Mission terminerMission(Long id, long kilometrageFin) {
        Mission mission = missionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Mission non trouvée"));

        if (mission.getStatut() == StatutMission.TERMINEE) {
            throw new IllegalStateException("Cette mission est déjà terminée.");
        }
        
        mission.setStatut(StatutMission.TERMINEE);
        mission.setKilometrageFin(kilometrageFin);
        mission.setDateFin(java.time.LocalDateTime.now()); 
        // Libérer les ressources
        Vehicule vehicule = mission.getVehicule();
        vehicule.setStatut(StatutVehicule.EN_SERVICE);
        vehicule.setKilometrage(kilometrageFin); 
        vehiculeRepository.save(vehicule);

        Chauffeur chauffeur = mission.getChauffeur();
        chauffeur.setEtat(EtatChauffeur.DISPONIBLE);
        chauffeurRepository.save(chauffeur);

        return missionRepository.save(mission);
    }
     // --- UPDATE ---2
      @Transactional
    public Mission update(Long id, MissionDto dto) {
    
        Mission mission = missionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Mission non trouvée avec l'ID : " + id));

        
        if (mission.getStatut() != StatutMission.PLANIFIEE) {
            throw new IllegalStateException("Impossible de modifier une mission qui est déjà en cours ou terminée.");
        }

        Vehicule vehicule = vehiculeRepository.findById(dto.getVehiculeId())
                .orElseThrow(() -> new EntityNotFoundException("Véhicule non trouvé avec l'ID : " + dto.getVehiculeId()));
        Chauffeur chauffeur = chauffeurRepository.findById(dto.getChauffeurId())
                .orElseThrow(() -> new EntityNotFoundException("Chauffeur non trouvé avec l'ID : " + dto.getChauffeurId()));

    
        mission.setMotif(dto.getMotif());
        mission.setDestination(dto.getDestination());
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
        Mission mission = missionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Mission non trouvée"));
        
    
        if (mission.getStatut() == StatutMission.EN_COURS || mission.getStatut() == StatutMission.PLANIFIEE) {
            Vehicule vehicule = mission.getVehicule();
            vehicule.setStatut(StatutVehicule.EN_SERVICE);
            vehiculeRepository.save(vehicule);

            Chauffeur chauffeur = mission.getChauffeur();
            chauffeur.setEtat(EtatChauffeur.DISPONIBLE);
            chauffeurRepository.save(chauffeur);
        }

        missionRepository.deleteById(id);
    }

  
    private MissionDto convertToDto(Mission mission) {
        MissionDto dto = new MissionDto();
        dto.setId(mission.getId());
        dto.setMotif(mission.getMotif());
        dto.setDestination(mission.getDestination());
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