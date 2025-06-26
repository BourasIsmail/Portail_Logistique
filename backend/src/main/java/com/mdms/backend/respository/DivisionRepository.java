package com.mdms.backend.respository;

import com.mdms.backend.entity.Division;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DivisionRepository extends JpaRepository<Division, Long> {
    Optional<Division> findByDivName(String divName);

    Optional<Division> findByDivId(Long divId);

    boolean existsByDivName(String divName);
}
