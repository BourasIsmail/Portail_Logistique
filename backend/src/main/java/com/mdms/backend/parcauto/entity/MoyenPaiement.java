package com.mdms.backend.parcauto.entity;

import com.mdms.backend.parcauto.enums.StatutMoyenPaiement;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "moyens_paiement")
@Data
public class MoyenPaiement {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String numero;
    private String fournisseur;

    @Enumerated(EnumType.STRING)
    private StatutMoyenPaiement statut;
}
