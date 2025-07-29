package com.mdms.backend.parcauto.repository;

import com.mdms.backend.parcauto.entity.Chauffeur;
import com.mdms.backend.parcauto.enums.EtatChauffeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChauffeurRepository extends JpaRepository<Chauffeur, Long> {
    List<Chauffeur> findByEtat(EtatChauffeur etat);
}