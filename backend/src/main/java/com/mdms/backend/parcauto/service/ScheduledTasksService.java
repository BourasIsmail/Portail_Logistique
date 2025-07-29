package com.mdms.backend.parcauto.service;

import com.mdms.backend.parcauto.entity.Vehicule;
import com.mdms.backend.parcauto.repository.VehiculeRepository;
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

    @Autowired
    private VehiculeRepository vehiculeRepository;

    @Autowired
    private NotificationService notificationService; 

    
    private static final String GESTIONNAIRE_EMAIL = "gestionnaire.parc@example.com";
    // S'exécute tous les jours à 8h du matin
    @Scheduled(cron = "0 0 8 * * ?")
    public void checkEcheances() {
        log.info("--- Démarrage de la vérification quotidienne des échéances ---");
        
        // On définit la date limite (aujourd'hui + 30 jours)
        LocalDate limite = LocalDate.now().plusDays(30);

        // 1. Vérifier les assurances expirant bientôt
        List<Vehicule> vehiculesAssurance = vehiculeRepository.findByDateExpirationAssuranceBefore(limite);
        log.info("Trouvé {} véhicule(s) avec une assurance expirant bientôt.", vehiculesAssurance.size());
        for (Vehicule vehicule : vehiculesAssurance) {
            notificationService.sendAssuranceExpirationAlert(vehicule, GESTIONNAIRE_EMAIL);
        }

        // 2. Vérifier les contrôles techniques expirant bientôt
        List<Vehicule> vehiculesControle = vehiculeRepository.findByDateProchainControleTechniqueBefore(limite);
        log.info("Trouvé {} véhicule(s) avec un contrôle technique expirant bientôt.", vehiculesControle.size());
        for (Vehicule vehicule : vehiculesControle) {
            log.info("ALERTE : Contrôle technique requis pour le véhicule: {}", vehicule.getImmatriculation());
        }

        log.info("--- Fin de la vérification quotidienne des échéances ---");
    }
}