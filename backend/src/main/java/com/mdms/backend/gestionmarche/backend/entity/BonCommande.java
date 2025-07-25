package com.mdms.backend.gestionmarche.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    private String pmnNum;
    private String pmnObjet;
    private String numBC;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateBC;
    private String attributaire;
    private Double montant;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateNotificationBC;
    private String delaiExecution;

    @ManyToOne(fetch =  FetchType.EAGER)
    @JoinColumn(name = "pmnId")
    private PMN pmn;

    @ManyToOne(fetch =  FetchType.EAGER)
    @JoinColumn(name = "rubriqueId")
    private Rubrique rubrique;

    @OneToMany(mappedBy = "bonCommande", cascade = CascadeType.ALL, orphanRemoval = true,  fetch = FetchType.EAGER)
    private List<SituationBC> situationBCs;
}
