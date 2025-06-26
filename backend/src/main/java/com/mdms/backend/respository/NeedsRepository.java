package com.mdms.backend.respository;

import com.mdms.backend.entity.Needs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NeedsRepository extends JpaRepository<Needs, Long> {
}
