package com.mdms.backend.gestionmarche.backend.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mdms.backend.gestionmarche.backend.entity.BonCommande;
import com.mdms.backend.gestionmarche.backend.entity.PMN;
import com.mdms.backend.gestionmarche.backend.entity.SituationBC;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@Data
public class SituationBCRequest {
    private Long id;

    private Date dateEnregistrement;
    private Date dateLiquidation;
    private Date dateLivraison;
    private Date dateReceptionProvisoire;
    private Date dateServiceFait;

    private Double montantFacture;
    private String numFacture;
    private String observation;
    private boolean paye;
}
