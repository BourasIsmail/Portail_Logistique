package com.mdms.backend.parcauto.repository;

import com.mdms.backend.parcauto.entity.Vehicule;
import com.mdms.backend.parcauto.enums.StatutVehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface VehiculeRepository extends JpaRepository<Vehicule, Long> {

    Optional<Vehicule> findByImmatriculation(String immatriculation);
    List<Vehicule> findByStatut(StatutVehicule statut);
    List<Vehicule> findByDateExpirationAssuranceBefore(LocalDate dateLimite);
    List<Vehicule> findByDateProchainControleTechniqueBefore(LocalDate dateLimite);
}