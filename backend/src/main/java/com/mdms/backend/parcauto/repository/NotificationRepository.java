package com.mdms.backend.parcauto.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mdms.backend.parcauto.entity.Notification;
import com.mdms.backend.parcauto.enums.StatutNotification;
import java.util.*;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long>  {

   List<Notification> findByDestinataireUserIdAndStatut(Long userId, StatutNotification statut);
    
} 

