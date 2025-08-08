package com.mdms.backend.parcauto.repository;

import com.mdms.backend.parcauto.entity.Mission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional; // Import nécessaire

@Repository
public interface MissionRepository extends JpaRepository<Mission, Long> {

    @Query(value = "SELECT m FROM Mission m LEFT JOIN FETCH m.vehicule LEFT JOIN FETCH m.chauffeur",
           countQuery = "SELECT count(m) FROM Mission m")
    Page<Mission> findAllWithDetails(Pageable pageable);
    
    @Query("SELECT m FROM Mission m LEFT JOIN FETCH m.vehicule LEFT JOIN FETCH m.chauffeur WHERE LOWER(m.motif) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(m.destination) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Mission> searchByMotifOrDestinationContainingIgnoreCase(@Param("query") String query, Pageable pageable);
    
    // NOUVELLE MÉTHODE OPTIMISÉE POUR findById
    @Query("SELECT m FROM Mission m LEFT JOIN FETCH m.vehicule LEFT JOIN FETCH m.chauffeur WHERE m.id = :id")
    Optional<Mission> findByIdWithDetails(@Param("id") Long id);
}