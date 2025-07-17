package com.mdms.backend.gestionmarche.backend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ContractRequest {
    private String reference;
    private String anneeBudgetaire;
    private String objet;
    private String description; // optional
    private String attributaire;
    private Number montant;
    private Date dateSignature;
    private Date dateDebut;
    private Date dateFin;
    private String statut;
    private String numCompte;// optional

    private Long typeBudgetId;
    private Long rubriqueId;
}
