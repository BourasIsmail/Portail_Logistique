package com.gestionmarche.backend.repository;

import com.gestionmarche.backend.entity.TypeBudget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeBudgetRepository extends JpaRepository<TypeBudget, Long> {

}