package com.mdms.backend.respository;

import com.mdms.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserName(String userName);
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
