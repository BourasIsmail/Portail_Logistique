package com.mdms.backend.parcauto.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
@Data
public class RegionDto {
    private Long id;

    @NotBlank(message = "Le code de la région ne peut pas être vide.")
    @Size(max = 10, message = "Le code ne doit pas dépasser 10 caractères.")

    private String code;

    @NotBlank(message = "Le nom en français ne peut pas être vide.")
    private String nomFr;

    @NotBlank(message = "Le nom en arabe ne peut pas être vide.")
    private String nomAr;
}