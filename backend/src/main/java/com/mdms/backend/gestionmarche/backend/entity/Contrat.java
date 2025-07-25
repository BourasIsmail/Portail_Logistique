package com.mdms.backend.gestionmarche.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
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
@Table(name = "contrat")
public class Contrat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String reference;
    private String anneeBudgetaire;
    private String objet;
    private String description; // optional
    private String attributaire;
    private Double montant;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateSignature;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateDebut;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
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
