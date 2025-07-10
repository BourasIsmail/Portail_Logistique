package com.mdms.backend.gestionmarche.backend.repository;

import com.mdms.backend.gestionmarche.backend.entity.BonCommande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BonCommandeRepository extends JpaRepository<BonCommande, Long> {
}