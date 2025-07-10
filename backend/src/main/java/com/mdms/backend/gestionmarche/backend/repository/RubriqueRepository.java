package com.gestionmarche.backend.repository;

import com.gestionmarche.backend.entity.Rubrique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RubriqueRepository extends JpaRepository<Rubrique, Long> {
}