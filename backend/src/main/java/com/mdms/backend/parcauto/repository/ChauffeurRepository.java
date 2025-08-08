package com.mdms.backend.parcauto.repository;

import com.mdms.backend.parcauto.entity.Chauffeur;
import com.mdms.backend.parcauto.enums.EtatChauffeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface ChauffeurRepository extends JpaRepository<Chauffeur, Long> {
    List<Chauffeur> findByEtat(EtatChauffeur etat);

    @Query("SELECT c FROM Chauffeur c WHERE LOWER(c.nom) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(c.prenom) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Chauffeur> searchByNomOrPrenomContainingIgnoreCase(@Param("query") String query, Pageable pageable);
    
    // Méthode optimisée pour lister tout
    @Query(value = "SELECT c FROM Chauffeur c LEFT JOIN FETCH c.centreRattachement",
           countQuery = "SELECT count(c) FROM Chauffeur c")
    Page<Chauffeur> findAllWithDetails(Pageable pageable);

     List<Chauffeur> findByEtatAndCentreRattachement_Nom(EtatChauffeur etat, String nomCentre);
}