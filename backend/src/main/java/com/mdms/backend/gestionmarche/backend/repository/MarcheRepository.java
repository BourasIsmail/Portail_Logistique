package com.gestionmarche.backend.repository;

import com.gestionmarche.backend.entity.Marche;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarcheRepository extends JpaRepository<Marche, Long> {
}