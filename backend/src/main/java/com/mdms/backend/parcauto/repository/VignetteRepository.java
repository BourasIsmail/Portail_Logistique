package com.mdms.backend.parcauto.repository;

import com.mdms.backend.parcauto.entity.Vignette;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VignetteRepository extends JpaRepository<Vignette, Long> {}
