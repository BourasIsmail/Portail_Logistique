package com.mdms.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "materials")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mat_id")
    private Long matId;

    @NotBlank
    @Column(name = "mat_name")
    private String matName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ctgr_id", referencedColumnName = "ctgr_id")
    @JsonIgnoreProperties({"materials"})
    private CategoryMat category;

}
