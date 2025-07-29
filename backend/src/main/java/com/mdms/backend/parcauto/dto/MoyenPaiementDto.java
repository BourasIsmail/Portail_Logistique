package com.mdms.backend.parcauto.dto;

import com.mdms.backend.parcauto.enums.StatutMoyenPaiement;
import com.mdms.backend.parcauto.enums.TypeCarteCarburant;
import lombok.Data;

@Data
public class MoyenPaiementDto {
    private Long id;
    private String numero;
    private String fournisseur;
    private StatutMoyenPaiement statut;
    private String typeClasse;


    private TypeCarteCarburant typeCarte;
    private Double plafondOuValeur;

    // --- Champs spécifiques à BadgeJawaz ---
    private Double solde;

    // --- Champs spécifiques à Vignette ---
    private Double montantDisponible;
    private String typeUtilisation;
}