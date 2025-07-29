package com.mdms.backend.parcauto.repository;

import com.mdms.backend.parcauto.entity.MoyenPaiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoyenPaiementRepository extends JpaRepository<MoyenPaiement, Long> {}