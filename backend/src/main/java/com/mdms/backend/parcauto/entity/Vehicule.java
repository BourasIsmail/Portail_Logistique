package com.mdms.backend.parcauto.entity;
import com.mdms.backend.parcauto.enums.TypeCarburant;
import com.mdms.backend.parcauto.enums.StatutVehicule; 
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "vehicules")
@Getter 
@Setter 
@NoArgsConstructor 
public class Vehicule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   
    @Column(name = "immatriculation", unique = true, nullable = false)
    private String immatriculation;
    
    @Column(name = "marque")
    private String marque;
    
    @Column(name = "modele")
    private String modele;


    @Column(name = "genre_vehicule")
    private String genre; 

    
    @Enumerated(EnumType.STRING)
    @Column(name = "type_carburant")
    private TypeCarburant typeCarburant;


    @Column(name = "puissance_fiscale")
    private Integer puissanceFiscale; 

  
    @Column(name = "date_mise_en_circulation")
    private LocalDate dateMiseEnCirculation;


   
    @Enumerated(EnumType.STRING)
    @Column(name = "statut")
    private StatutVehicule statut;
    
    @Column(name = "kilometrage")
    private Long kilometrage;
    
    @Column(name = "date_expiration_assurance")
    private LocalDate dateExpirationAssurance;
    
    @Column(name = "date_prochain_controle_technique")
    private LocalDate dateProchainControleTechnique;
    
    @Column(name = "a_fait_accident")
    private boolean aFaitAccident; 
    
    @Column(name = "etat_description") 
    private String etat;
    
    @Column(name = "observations", length = 512) 
    private String observations;


   
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "centre_rattachement_id")
    private CentreRattachement centreRattachement;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chauffeur_attitre_id") 
    private Chauffeur chauffeurAttitre;
    
    @OneToMany(mappedBy = "vehicule", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Mission> missions;

    @OneToMany(mappedBy = "vehicule", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Depense> depenses;

    @Override
    public String toString() {
        return "Vehicule{" +
                "id=" + id +
                ", immatriculation='" + immatriculation + '\'' +
                ", marque='" + marque + '\'' +
                ", modele='" + modele + '\'' +
                '}';
    }
}