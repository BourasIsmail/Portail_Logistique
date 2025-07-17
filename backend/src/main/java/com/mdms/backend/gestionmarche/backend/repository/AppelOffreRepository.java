package com.mdms.backend.gestionmarche.backend.repository;

import com.mdms.backend.gestionmarche.backend.entity.AppelOffre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppelOffreRepository extends JpaRepository<AppelOffre, Long>{
    AppelOffre findByReference(String reference);
    boolean existsByReference(String reference);
}
