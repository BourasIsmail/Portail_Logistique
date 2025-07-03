package com.mdms.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "services")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_id")
    private Long serviceId;

    @NotBlank
    @Column(name = "service_name", unique = true)
    private String serviceName;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "div_id", referencedColumnName = "div_id")
    @JsonIgnoreProperties({"services"})
    private Division division;

    @OneToOne(mappedBy = "service", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnoreProperties({"service"})
    private User user;
}
