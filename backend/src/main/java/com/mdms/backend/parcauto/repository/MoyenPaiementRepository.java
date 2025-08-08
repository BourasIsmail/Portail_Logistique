package com.mdms.backend.parcauto.repository;

import com.mdms.backend.parcauto.entity.MoyenPaiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Sort;
import java.util.*;

@Repository
public interface MoyenPaiementRepository extends JpaRepository<MoyenPaiement, Long> {

     @Query(value = "SELECT mp FROM MoyenPaiement mp",
           countQuery = "SELECT count(mp) FROM MoyenPaiement mp")
    Page<MoyenPaiement> findAllWithDetails(Pageable pageable);


        
    @Query("SELECT mp FROM MoyenPaiement mp WHERE " +
           "LOWER(mp.numero) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(mp.fournisseur) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<MoyenPaiement> searchByNumeroOrFournisseur(@Param("query") String query, Pageable pageable);


     @Query("SELECT mp FROM MoyenPaiement mp")
    List<MoyenPaiement> findAllForSelect(Sort sort);
}