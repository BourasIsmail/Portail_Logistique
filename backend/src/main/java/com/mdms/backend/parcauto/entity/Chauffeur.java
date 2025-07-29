package com.mdms.backend.parcauto.entity;
import com.mdms.backend.parcauto.enums.EtatChauffeur;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;

@Entity
@Table(name = "chauffeurs")
@Data
public class Chauffeur {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nom;
    private String prenom;
    private int age;

    @Enumerated(EnumType.STRING)
    private EtatChauffeur etat;
    
    private String typePermis;
    private boolean stable;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "centre_rattachement_id")
    private CentreRattachement centreRattachement;
    
    @OneToMany(mappedBy = "chauffeur")
    private Set<Mission> missions;

}
