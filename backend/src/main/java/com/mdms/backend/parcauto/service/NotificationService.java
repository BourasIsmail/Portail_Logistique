package com.mdms.backend.parcauto.service;

import com.mdms.backend.parcauto.dto.NotificationDto;
import com.mdms.backend.parcauto.entity.Notification;
import com.mdms.backend.parcauto.enums.StatutNotification;
import com.mdms.backend.parcauto.entity.Vehicule;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import com.mdms.backend.parcauto.repository.NotificationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;



@Service
public class NotificationService {

    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private NotificationRepository notificationRepository;

    // --- READ ---
    @Transactional(readOnly = true)
     public List<NotificationDto> findUnreadNotificationsByUserId(Long userId) {
        List<Notification> notifications = notificationRepository.findByDestinataireUserIdAndStatut(userId,StatutNotification.NON_LUE);

        return 
        notifications.stream().map(this::convertToDto).collect(Collectors.toList());
    }

     // --- UPDATE ---
     @Transactional
     public NotificationDto markAsRead(Long notificationId){
        Notification notification = notificationRepository.findById(notificationId)
          .orElseThrow(() -> new EntityNotFoundException("Notification non trouvée avec l'ID : " + notificationId));

          notification.setStatut(StatutNotification.LUE);
          Notification updatedNotification = notificationRepository.save(notification);

          return convertToDto(updatedNotification);

     }
      // --- UPDATE ---
     @Transactional
     public void  markAllAsReadByUserId(Long userId) {
        List<Notification> unreadNotifications = notificationRepository.findByDestinataireUserIdAndStatut(userId,StatutNotification.NON_LUE);
           
        for(Notification notification: unreadNotifications){
            notification.setStatut(StatutNotification.LUE);
        }

        notificationRepository.saveAll(unreadNotifications);

     }
    // --- DELETE ---
    @Transactional
    public void deleteNotification(Long notificationId){
        if(!notificationRepository.existsById(notificationId)){
            throw new EntityNotFoundException("Notification non trouvée avec l'ID : " + notificationId);
        }

        notificationRepository.deleteById(notificationId);
    }

     private NotificationDto convertToDto(Notification notification) {
        NotificationDto dto = new NotificationDto();
        dto.setId(notification.getId());
        dto.setMessage(notification.getMessage());
        dto.setType(notification.getType());
        dto.setStatut(notification.getStatut());
        dto.setDateCreation(notification.getDateCreation());

        if (notification.getDestinataire() != null) {
            dto.setDestinataireId(notification.getDestinataire().getUserId());
            dto.setDestinataireNom(notification.getDestinataire().getUserName());
        }
        if (notification.getVehicule() != null) {
            dto.setVehiculeId(notification.getVehicule().getId());
            dto.setVehiculeImmatriculation(notification.getVehicule().getImmatriculation());
        }
        if (notification.getMaintenance() != null) {
            dto.setMaintenanceId(notification.getMaintenance().getId());
        }

        return dto;
    }

    // Methode d'envoit d'email(ASSURANCE)
     public void sendAssuranceExpirationAlert(Vehicule vehicule, String recipientEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        //pour tester
        message.setFrom("no-reply@parcauto-mdms.com");
        message.setTo(recipientEmail);
        message.setSubject("Alerte d'échéance : Assurance du véhicule " + vehicule.getImmatriculation());
        message.setText(
            "Bonjour,\n\n" +
            "Ceci est un rappel automatique.\n\n" +
            "L'assurance du véhicule " + vehicule.getMarque() + " " + vehicule.getModele() +
            " (Immatriculation: " + vehicule.getImmatriculation() + ") " +
            "expire le " + vehicule.getDateExpirationAssurance() + ".\n\n" +
            "Veuillez prendre les mesures nécessaires.\n\n" +
            "Cordialement,\nL'Application de Gestion du Parc Auto."
        );
        mailSender.send(message);
    }

      // --- NOUVELLE MÉTHODE D'ENVOI D'EMAIL POUR LE CONTRÔLE TECHNIQUE ---
    public void sendControleTechniqueAlert(Vehicule vehicule, String recipientEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
     //pour tester
        message.setFrom("no-reply@parcauto-mdms.com");
        message.setTo(recipientEmail);
        message.setSubject("Alerte d'échéance : Contrôle Technique du véhicule " + vehicule.getImmatriculation());
        message.setText(
            "Bonjour,\n\n" +
            "Ceci est un rappel automatique.\n\n" +
            "Le contrôle technique du véhicule " + vehicule.getMarque() + " " + vehicule.getModele() +
            " (Immatriculation: " + vehicule.getImmatriculation() + ") " +
            "doit être effectué avant le " + vehicule.getDateProchainControleTechnique() + ".\n\n" +
            "Veuillez prendre les mesures nécessaires pour planifier une visite.\n\n" +
            "Cordialement,\nL'Application de Gestion du Parc Auto."
        );
        mailSender.send(message);
    }
}
