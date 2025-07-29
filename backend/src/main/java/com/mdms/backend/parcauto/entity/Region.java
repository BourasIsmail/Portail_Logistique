package com.mdms.backend.parcauto.entity;


import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "regions")
@Data
public class Region {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(unique = true, nullable = false)
    private String code;

    private String nomFr;
    private String nomAr;

 @OneToMany(mappedBy = "region")
 private Set<CentreRattachement> centresRattachement;
}
