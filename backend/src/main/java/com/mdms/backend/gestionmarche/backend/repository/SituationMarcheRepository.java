package com.mdms.backend.gestionmarche.backend.repository;

import com.mdms.backend.gestionmarche.backend.entity.SituationMarche;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SituationMarcheRepository extends JpaRepository<SituationMarche, Long> {
}