package com.gestionmarche.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "marche")
public class Marche {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String anneeBudgetaire;
    private String numCompte;
    private String rubrique;
    private String referenceMarche;
    private String objet;
    private String attributaire;
    private float montantMarche;
    private Date dateApprobation;
    private Date dateVisa;
    private Date dateNotificationApprobation;
    private Date dateOrdreService;
    private int delaiExecution;

    @ManyToOne(fetch =  FetchType.EAGER)
    @JoinColumn(name = "typeBudgetId")
    private TypeBudget typeBudget;

    @OneToMany(mappedBy = "marche", cascade = CascadeType.ALL, orphanRemoval = true,  fetch = FetchType.EAGER)
    private List<SituationMarche> situationMarches ;
}
