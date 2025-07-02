package com.mdms.backend.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;

@Getter
public class AddMaterialRequest {
    @NotBlank(message = "material name is required")
    private String matName;

    @NotNull(message = "category name is required")
    private String ctgrName;
}
