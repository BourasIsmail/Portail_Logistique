package com.gestionmarche.backend.repository;

import com.gestionmarche.backend.entity.PMN;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PMNRepository extends JpaRepository<PMN, Long> {
}