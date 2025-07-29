package com.mdms.backend.parcauto.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class DepenseDto {

    private Long id;
    private String typeDepense; 
    private LocalDate date;
    private Double montant;
    private String justificatifUrl;

    private Long vehiculeId;
    private String vehiculeImmatriculation;

 
    private Long moyenPaiementId;
    private String moyenPaiementNumero;

    
    private String typeIntervention;
    private String nomGarage;
    private String description;


    private Double litres;
    private Long kilometrage;
}