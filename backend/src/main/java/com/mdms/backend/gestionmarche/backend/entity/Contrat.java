package com.mdms.backend.gestionmarche.backend.entity;

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
public class Contrat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reference;
    private String anneeBudgetaire;
    private String objet;
    private String description; // optional
    private String attributaire;
    private float montant;
    private Date dateSignature;
    private Date dateDebut;
    private Date dateFin;
    private String statut;

    private String numCompte;// optional

    @ManyToOne(fetch =  FetchType.EAGER)
    @JoinColumn(name = "typeBudgetId")
    private TypeBudget typeBudget;

    @ManyToOne(fetch =  FetchType.EAGER)
    @JoinColumn(name = "rubriqueId")
    private Rubrique rubrique;// optional


}
