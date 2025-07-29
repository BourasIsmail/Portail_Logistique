package com.mdms.backend.parcauto.dto;
import com.mdms.backend.parcauto.enums.EtatChauffeur;
import lombok.Data;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
public class ChauffeurDto {
    private Long id;
    @NotBlank(message = "Le nom du chauffeur ne peut pas être vide.")
    private String nom;
    @NotBlank(message = "Le prénom du chauffeur ne peut pas être vide.")
    private String prenom;
    @Min(value = 18, message = "L'âge doit être d'au moins 18 ans.")
    private int age;
    @NotNull(message = "L'état du chauffeur est obligatoire.")
    private EtatChauffeur etat;
    @NotBlank(message = "Le type de permis ne peut pas être vide.")
    private String typePermis;
    private boolean stable;
    private Long centreRattachementId;
    private String centreRattachementNom;
}
