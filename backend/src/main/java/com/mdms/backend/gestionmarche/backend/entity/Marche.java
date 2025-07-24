package com.mdms.backend.gestionmarche.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.bind.DefaultValue;

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
    @Column(unique = true)
    private String referenceMarche;
    private String objet;
    private String attributaire;
    private Number montantMarche;
    private String typeBudgetInv;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateApprobation;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateVisa;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateNotificationApprobation;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date dateOrdreService;

    private String delaiExecution;

    @ManyToOne(fetch =  FetchType.EAGER)
    @JoinColumn(name = "typeBudgetId")
    private TypeBudget typeBudget;

    @ManyToOne(fetch =  FetchType.EAGER)
    @JoinColumn(name = "rubriqueId")
    private Rubrique rubrique;

    @OneToMany(mappedBy = "marche", cascade = CascadeType.ALL, orphanRemoval = true,  fetch = FetchType.EAGER)
    private List<SituationMarche> situationMarches ;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "appelOffreId")
    @JsonIgnoreProperties({"marches"})
    private AppelOffre appelOffre;
}
