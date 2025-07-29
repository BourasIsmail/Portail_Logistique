package com.mdms.backend.parcauto.repository;
import com.mdms.backend.parcauto.entity.CentreRattachement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CentreRattachementRepository extends JpaRepository<CentreRattachement, Long> {
    List<CentreRattachement> findByRegionId(Long regionId);
}
   
