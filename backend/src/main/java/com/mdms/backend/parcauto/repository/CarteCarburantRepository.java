package com.mdms.backend.parcauto.repository;

import com.mdms.backend.parcauto.entity.CarteCarburant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarteCarburantRepository extends JpaRepository<CarteCarburant, Long> {}