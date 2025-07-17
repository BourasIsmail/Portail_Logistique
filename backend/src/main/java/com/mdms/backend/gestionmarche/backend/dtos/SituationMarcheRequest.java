package com.mdms.backend.gestionmarche.backend.dtos;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class SituationMarcheRequest {
    private Long id;
    private Date dateEnregistrement;
    private Date dateLiquidation;
    private Date dateLivraison;
    private Date dateReceptionProvisoire;
    private Date dateServiceFait;

    private String numFacture;
    private String numDecompte;
    private Number montantDecompte;

    private Boolean paye;
    private String observation;
}
