package com.mdms.backend.gestionmarche.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bon_commande")
public class BonCommande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String anneeBudgetaire;
    private String numCompte;
    private String rubrique;
    private String pmnNum;
    private String pmnObjet;
    private String numBC;
    private Date dateBC;
    private String attributaire;
    private float montant;
    private Date dateNotificationBC;
    private int delaiExecution;

    @ManyToOne(fetch =  FetchType.EAGER)
    @JoinColumn(name = "pmnId")
    private PMN pmn;

    @OneToMany(mappedBy = "bonCommande", cascade = CascadeType.ALL, orphanRemoval = true,  fetch = FetchType.EAGER)
    private List<SituationBC> situationBCs;
}
