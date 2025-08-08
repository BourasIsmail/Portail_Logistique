package com.mdms.backend.parcauto.dto;

import com.mdms.backend.parcauto.enums.StatutMission;
import lombok.Data;
import java.time.LocalDateTime;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
@Data
public class MissionDto {
    private Long id;
    @NotBlank(message = "Le motif de la mission ne peut pas être vide.")
    private String motif;
    @NotBlank(message = "La destination ne peut pas être vide.")
    private String destination;

    private String numeroSuiviRh; 
    
    @NotNull(message = "La date de début est obligatoire.")
    @FutureOrPresent(message = "La date de début ne peut pas être dans le passé.")
    private LocalDateTime dateDebut;
    @NotNull(message = "La date de fin est obligatoire.")
    private LocalDateTime dateFin;
    private StatutMission statut;
    private Long kilometrageDepart;
    private Long kilometrageFin;
    @NotNull(message = "L'ID du véhicule est obligatoire.")
    private Long vehiculeId;
    private String vehiculeImmatriculation;
    @NotNull(message = "L'ID du chauffeur est obligatoire.")
    private Long chauffeurId;
    private String chauffeurNomComplet;
}