package com.mdms.backend.gestionmarche.backend.repository;

import com.mdms.backend.gestionmarche.backend.entity.TypeBudget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeBudgetRepository extends JpaRepository<TypeBudget, Long> {

}