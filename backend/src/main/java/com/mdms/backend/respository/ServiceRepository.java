package com.mdms.backend.respository;

import com.mdms.backend.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    Optional<Service> findByServiceName(String serviceName);
    Optional<Service> findByServiceId(Long serviceId);
    boolean existsByServiceName(String serviceName);
}
