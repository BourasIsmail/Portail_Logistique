package com.mdms.backend.parcauto.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.mdms.backend.parcauto.enums.StatutNotification;
import com.mdms.backend.parcauto.enums.TypeNotification;

import lombok.Data;

@Data
public class NotificationDto {
    
    private Long id;
    private String message;
    private TypeNotification type;
    private StatutNotification statut;
    private LocalDateTime dateCreation;

    private Long destinataireId;
    private String destinataireNom;

    private Long vehiculeId;
    private String vehiculeImmatriculation;

    private Long maintenanceId;
}
