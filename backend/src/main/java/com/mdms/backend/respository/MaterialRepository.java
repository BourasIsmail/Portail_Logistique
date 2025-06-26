package com.mdms.backend.respository;

import com.mdms.backend.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Long> {
    Material findByMatName(String matName);

    boolean existsByMatName(String matName);
}
