package com.mdms.backend.gestionmarche.backend.dtos;


import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AppelOffreRequest {
    private String reference;
    private String anneeBudgetaire;
    private String objet;
    private Double estimation;
    private String attributaire;
    private Double montant;

    private Date datePublication;
    private Date dateOuverture;
    private Date dateFinTravaux;
    private Date dateNotificationApprobation;

    private Long rubriqueId;
    private Long typeAOId;
}
