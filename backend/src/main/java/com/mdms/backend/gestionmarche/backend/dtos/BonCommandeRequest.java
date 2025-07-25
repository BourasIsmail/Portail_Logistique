package com.mdms.backend.gestionmarche.backend.dtos;

import com.mdms.backend.gestionmarche.backend.entity.PMN;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class BonCommandeRequest {
    private String anneeBudgetaire;
    private String attributaire;

    private Date dateBC;
    private Date dateNotificationBC;

    private String delaiExecution;
    private String numBC;
    private String numCompte;
    private Double montant;

    private String pmnNum;
    private String pmnObjet;

    private Long pmnId;
    private Long rubriqueId;

    private List<SituationBCRequest> situationBCs;
}
