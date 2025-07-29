package com.mdms.backend.parcauto.dto;
import lombok.Data;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
@Data
public class CentreRattachementDto {
    private long id;

    @NotBlank(message = "Le nom du centre ne peut pas être vide.")
    private String nom;
    @NotBlank(message = "La ville ne peut pas être vide.")
    private String ville;
    @NotNull(message = "L'ID de la région est obligatoire.")
    private long region_id;
    private String regionNom;
}
