package com.mdms.backend.parcauto.entity;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;



@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "depenses")
@Data
public abstract class Depense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private LocalDate date;
    private Double montant;
    private String justificatifUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicule_id", nullable = false)
    private Vehicule vehicule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "moyen_paiement_id")
    private MoyenPaiement moyenPaiementUtilise;
}
