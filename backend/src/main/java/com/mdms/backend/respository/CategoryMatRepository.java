package com.mdms.backend.respository;

import com.mdms.backend.entity.CategoryMat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryMatRepository extends JpaRepository<CategoryMat, Long> {
    Optional<CategoryMat> findByCtgrName(String ctgrName);
    Optional<CategoryMat> findByCtgrId(Long ctgrId);

    boolean existsByCtgrName(String ctgrName);

}
