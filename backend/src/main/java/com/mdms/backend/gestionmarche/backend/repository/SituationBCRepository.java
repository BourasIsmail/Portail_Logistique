package com.gestionmarche.backend.repository;

import com.gestionmarche.backend.entity.SituationBC;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SituationBCRepository extends JpaRepository<SituationBC, Long> {
}