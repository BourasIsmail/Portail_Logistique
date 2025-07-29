package com.mdms.backend.parcauto.controller;

import com.mdms.backend.parcauto.dto.NotificationDto;
import com.mdms.backend.parcauto.service.NotificationService;
import com.mdms.backend.security.service.UserDetailsImp  ;//pour savoir user actuellement connecté;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder; 
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notifications") 

public class NotificationController {

    @Autowired
    private NotificationService notificationService;
    
    @GetMapping("/mes-notifications")
       public ResponseEntity<List<NotificationDto>> getMyUnreadNotifications() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImp userDetails = (UserDetailsImp) authentication.getPrincipal();
        Long userId = userDetails.getId();

        List<NotificationDto> notifications = notificationService.findUnreadNotificationsByUserId(userId);
        return ResponseEntity.ok(notifications);
    }

      @PutMapping("/{id}/marquer-comme-lue")
    public ResponseEntity<NotificationDto> markNotificationAsRead(@PathVariable Long id) {
        NotificationDto updatedNotification = notificationService.markAsRead(id);
        return ResponseEntity.ok(updatedNotification);
    }

       @PutMapping("/marquer-tout-comme-lu")
    public ResponseEntity<Void> markAllNotificationsAsRead() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImp userDetails = (UserDetailsImp) authentication.getPrincipal();
        Long userId = userDetails.getId();

        notificationService.markAllAsReadByUserId(userId);
        return ResponseEntity.noContent().build();
    }

      @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.noContent().build();
    }

}
