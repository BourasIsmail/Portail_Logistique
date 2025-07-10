package com.gestionmarche.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "situation_bon_commande")
public class SituationBC {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date dateLivraison;
    private String dateReceptionProvisoire;
    private String numFacture;
    private Date dateEnregistrement;
    private Date dateServiceFait;
    private Date dateLiquidation;
    private float montantFacture;
    private boolean paye;
    private String observation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bon_commande_id")
    @JsonIgnoreProperties("situationMarches")
    private BonCommande bonCommande;
}
