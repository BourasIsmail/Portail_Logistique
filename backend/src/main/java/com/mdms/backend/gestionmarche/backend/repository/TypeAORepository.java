package com.mdms.backend.gestionmarche.backend.repository;

import com.mdms.backend.gestionmarche.backend.entity.TypeAO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeAORepository extends JpaRepository<TypeAO, Long> {
    TypeAO findByName(String name);
    boolean existsByName(String name);
}