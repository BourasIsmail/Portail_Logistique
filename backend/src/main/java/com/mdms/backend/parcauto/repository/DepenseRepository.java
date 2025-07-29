package com.mdms.backend.parcauto.repository;

import com.mdms.backend.parcauto.entity.Depense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepenseRepository extends JpaRepository<Depense, Long> {
     List<Depense> findByVehiculeId(Long vehiculeId);
     long countByMoyenPaiementUtiliseId(Long moyenPaiementId);
}