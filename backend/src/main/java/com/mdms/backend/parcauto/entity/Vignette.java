package com.mdms.backend.parcauto.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "vignettes") 
@Getter
@Setter
public class Vignette extends MoyenPaiement {
    private Double montantDisponible;
    private String typeUtilisation; 
}