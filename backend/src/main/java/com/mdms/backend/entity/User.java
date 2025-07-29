package com.mdms.backend.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mdms.backend.parcauto.entity.CentreRattachement;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@NoArgsConstructor
@Setter
@Getter
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @NotBlank
    @Column(name = "user_name")
    private String userName;

    @NotBlank
    @Email
    @Column(name = "email", unique = true)
    private String email;

    @NotBlank
    @JsonIgnore
    @Column(name = "password")
    private String password;

    //a modifier(length = 50)
    @Column(name = "role" , length = 50)
    @Enumerated(EnumType.STRING)
    private Roles role = Roles.ROLE_USER;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "entity_id", referencedColumnName = "entity_id")
    @JsonIgnoreProperties({"user", "division"})
    private Service service;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"user"})
    private List<Ticket> tickets = new ArrayList<>();

    private boolean enabled = true;


    public void setRole(Roles role) {
        if (role == null) {
            this.role = Roles.ROLE_USER;
        }
        this.role = role;
    }

    public User(String userName, String email, String password, Service service) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.service = service;
    }

    //element ajoute(MODIF)


     @ManyToOne(fetch = FetchType.LAZY) 
     @JoinColumn(name = "centre_rattachement_id", nullable = true)
    private CentreRattachement centreRattachement;

     
        public User(String userName, String email, String password, Service service, CentreRattachement centreRattachement) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.service = service;
        this.centreRattachement = centreRattachement;
    }

}
