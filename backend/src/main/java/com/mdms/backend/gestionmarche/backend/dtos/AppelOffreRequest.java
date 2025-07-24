package com.mdms.backend.gestionmarche.backend.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mdms.backend.gestionmarche.backend.entity.Rubrique;
import com.mdms.backend.gestionmarche.backend.entity.TypeAO;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class AppelOffreRequest {
    private String reference;
    private String anneeBudgetaire;
    private String objet;
    private Number estimation;
    private String attributaire;
    private Number montant;

    private Date datePublication;
    private Date dateOuverture;
    private Date dateFinTravaux;
    private Date dateNotificationApprobation;

    private Long rubriqueId;
    private Long typeAOId;
}
