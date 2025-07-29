package com.mdms.backend.parcauto.entity;
import com.mdms.backend.parcauto.enums.TypeCarteCarburant;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "cartes_carburant")
@Getter
@Setter
public class CarteCarburant extends MoyenPaiement {
    @Enumerated(EnumType.STRING)
    private TypeCarteCarburant type;
    private Double plafondOuValeur;
}