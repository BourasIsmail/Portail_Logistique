package com.mdms.backend.parcauto.repository;

import com.mdms.backend.parcauto.entity.Depense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import org.springframework.data.repository.query.Param;
@Repository
public interface DepenseRepository extends JpaRepository<Depense, Long> {
     List<Depense> findByVehiculeId(Long vehiculeId);
     long countByMoyenPaiementUtiliseId(Long moyenPaiementId);

     @Query(value = "SELECT d FROM Depense d " +
                   "LEFT JOIN FETCH d.vehicule " +
                   "LEFT JOIN FETCH d.moyenPaiementUtilise",
           countQuery = "SELECT count(d) FROM Depense d")
    Page<Depense> findAllWithDetails(Pageable pageable);

     @Query("SELECT d FROM Depense d " +
           "LEFT JOIN d.vehicule v " +
           "WHERE (TYPE(d) = Maintenance AND LOWER('maintenance') LIKE LOWER(CONCAT('%', :query, '%'))) OR " +
           "(TYPE(d) = PleinCarburant AND LOWER('pleincarburant') LIKE LOWER(CONCAT('%', :query, '%'))) OR " +
           "(TYPE(d) = RechargeJawaz AND LOWER('rechargejawaz') LIKE LOWER(CONCAT('%', :query, '%'))) OR " +
           "LOWER(v.immatriculation) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Depense> searchByTerm(@Param("query") String query, Pageable pageable);
}