package com.mdms.backend.parcauto.repository;

import com.mdms.backend.parcauto.entity.Mission;
import com.mdms.backend.parcauto.enums.StatutMission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MissionRepository extends JpaRepository<Mission, Long> {


    List<Mission> findByChauffeurId(Long chauffeurId);


    List<Mission> findByVehiculeId(Long vehiculeId);


    List<Mission> findByStatut(StatutMission statut);

    List<Mission> findByDateDebutBetween(LocalDateTime start, LocalDateTime end);
}