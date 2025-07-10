package com.mdms.backend.gestionmarche.backend.repository;

import com.mdms.backend.gestionmarche.backend.entity.Rubrique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RubriqueRepository extends JpaRepository<Rubrique, Long> {
}