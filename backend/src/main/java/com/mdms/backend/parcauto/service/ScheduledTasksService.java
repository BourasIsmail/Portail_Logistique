package com.mdms.backend.parcauto.service;
import com.mdms.backend.entity.User;
import com.mdms.backend.parcauto.entity.Notification;
import com.mdms.backend.parcauto.entity.Vehicule;
import com.mdms.backend.parcauto.enums.StatutNotification;
import com.mdms.backend.parcauto.enums.TypeNotification;
import com.mdms.backend.parcauto.repository.NotificationRepository;
import com.mdms.backend.parcauto.repository.VehiculeRepository;
import com.mdms.backend.respository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ScheduledTasksService {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTasksService.class);

    @Autowired private VehiculeRepository vehiculeRepository;
    @Autowired private NotificationService notificationService; 
    @Autowired private UserRepository userRepository;

    @Scheduled(cron = "0 0 8 * * ?")//chaque jour a 8h du matin
//    @Scheduled(cron = "0 * * * * ?")
    public void checkEcheancesAndNotify() {
        log.info("--- Démarrage de la vérification des échéances ---");

        User gestionnaire = userRepository.findByEmail("a.jabran@entraide.ma").orElse(null);
//        User gestionnaire = userRepository.findByEmail("ayoubelebbar03@gmail.com").orElse(null);
        if (gestionnaire == null) {
            log.warn("Utilisateur gestionnaire introuvable. Impossible d'envoyer les notifications.");
            return;
        }

        LocalDate limite = LocalDate.now().plusDays(30);//dans les 30 prochains jours à partir d'aujourd'hui

        // 1. Vérifier les assurances
        List<Vehicule> vehiculesAssurance = vehiculeRepository.findByDateExpirationAssuranceBefore(limite);
        log.info("Trouvé {} véhicule(s) avec une assurance expirant bientôt.", vehiculesAssurance.size());
        for (Vehicule vehicule : vehiculesAssurance) {
            notificationService.createAndSendAssuranceAlert(vehicule, gestionnaire);
        }

        // 2. Vérifier les contrôles techniques
        List<Vehicule> vehiculesControle = vehiculeRepository.findByDateProchainControleTechniqueBefore(limite);
        log.info("Trouvé {} véhicule(s) avec un contrôle technique expirant bientôt.", vehiculesControle.size());
        for (Vehicule vehicule : vehiculesControle) {
            notificationService.createAndSendControleTechniqueAlert(vehicule, gestionnaire);
        }

        log.info("--- Fin de la vérification des échéances ---");
    }
}