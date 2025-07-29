package com.mdms.backend.parcauto.entity;
import jakarta.persistence.*;
import lombok.Setter;
import lombok.Getter;
@Entity
@Table(name = "maintenances")
@Getter
@Setter
public class Maintenance extends Depense {
    private String typeIntervention;
    private String nomGarage;
    private String description;
}
