package com.mdms.backend.parcauto.repository;

import com.mdms.backend.parcauto.entity.Vehicule;
import com.mdms.backend.parcauto.enums.StatutVehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
@Repository
public interface VehiculeRepository extends JpaRepository<Vehicule, Long> {

    Optional<Vehicule> findByImmatriculation(String immatriculation);
    List<Vehicule> findByStatut(StatutVehicule statut);
    List<Vehicule> findByDateExpirationAssuranceBefore(LocalDate dateLimite);
    List<Vehicule> findByDateProchainControleTechniqueBefore(LocalDate dateLimite);

    @Query(value = "SELECT v FROM Vehicule v " +
                   "LEFT JOIN FETCH v.centreRattachement " +
                   "LEFT JOIN FETCH v.chauffeurAttitre",
           countQuery = "SELECT count(v) FROM Vehicule v")
    Page<Vehicule> findAllWithDetails(Pageable pageable);
    

    @Query("SELECT v FROM Vehicule v WHERE LOWER(v.immatriculation) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Vehicule> searchByImmatriculationContainingIgnoreCase(@Param("query") String query, Pageable pageable);

}