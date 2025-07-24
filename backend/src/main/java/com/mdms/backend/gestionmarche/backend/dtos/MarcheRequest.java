package com.mdms.backend.gestionmarche.backend.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mdms.backend.gestionmarche.backend.entity.Rubrique;
import com.mdms.backend.gestionmarche.backend.entity.SituationMarche;
import com.mdms.backend.gestionmarche.backend.entity.TypeBudget;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class MarcheRequest {

    private String anneeBudgetaire;
    private String attributaire;

    private Date dateApprobation;
    private Date dateNotificationApprobation;
    private Date dateOrdreService;
    private Date dateVisa;

    private String delaiExecution;
    private Number montantMarche;
    private String numCompte;
    private String objet;
    private String referenceMarche;
    private String typeBudgetInv;

    private Long appelOffreId;
    private Long typeBudgetId;
    private Long rubriqueId;

    private List<SituationMarcheRequest> situationMarches ;
}
