package com.mdms.backend.parcauto.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "pleins_carburant")
@Getter
@Setter
public class PleinCarburant extends Depense {
    private Double litres;
    private Long kilometrage;
}
