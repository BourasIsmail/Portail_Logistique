package com.mdms.backend.parcauto.repository;
import com.mdms.backend.parcauto.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface RegionRepository extends JpaRepository<Region, Long> {
    Optional<Region> findByCode(String code);
}
   
