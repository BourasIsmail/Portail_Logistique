package com.mdms.backend.parcauto.dto;

import com.mdms.backend.parcauto.enums.StatutVehicule;
import com.mdms.backend.parcauto.enums.TypeCarburant;

import jakarta.validation.constraints.Size;
import lombok.Data;
import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
@Data
public class VehiculeDto {

    private Long id;

    @NotBlank(message = "L'immatriculation ne peut pas être vide.")
    @Size(min = 5, max = 20, message = "L'immatriculation doit contenir entre 5 et 20 caractères.")
    private String immatriculation;
    @NotBlank(message = "La marque ne peut pas être vide.")
    private String marque;
    private String modele;
    private String genre;
    @NotNull(message = "Le type de carburant est obligatoire.")
    private TypeCarburant typeCarburant;
    private Integer puissanceFiscale;
    private LocalDate dateMiseEnCirculation;
    @NotNull(message = "Le statut est obligatoire.")
    private StatutVehicule statut;
    private Long kilometrage;
    private LocalDate dateExpirationAssurance;
    private LocalDate dateProchainControleTechnique;
    private boolean aFaitAccident;
    private String etat;
    private String observations;
    
    @NotNull(message = "Le centre de rattachement est obligatoire.")
    private Long centreRattachementId;
    private String centreRattachementNom;
    
    private Long chauffeurAttitreId; 
    private String chauffeurAttitreNomComplet;
}