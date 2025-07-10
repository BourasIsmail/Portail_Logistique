package com.gestionmarche.backend.repository;

import com.gestionmarche.backend.entity.SituationMarche;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SituationMarcheRepository extends JpaRepository<SituationMarche, Long> {
}