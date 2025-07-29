package com.mdms.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "needs")
public class Needs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "need_id")
    private Long needId;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "need_aff")
    private String affectation;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mat_id", referencedColumnName = "mat_id")
    @JsonIgnoreProperties({"category"})
    private Material material;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ticket_id", referencedColumnName = "ticket_id")
    private Ticket ticket;

}
