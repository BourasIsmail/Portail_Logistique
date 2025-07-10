package com.gestionmarche.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "situation_marche")
public class SituationMarche {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date dateLivraison;
    private Date dateReceptionProvisoire;
    private String numFacture;
    private Date dateEnregistrement;
    private String numDecompte;
    private Date dateServiceFait;
    private Date dateLiquidation;
    private float montantDecompte;
    private Boolean paye;
    private String observation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "marche_id")
    @JsonIgnoreProperties("")
    private Marche marche;

}
