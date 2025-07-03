package com.mdms.backend.request;

import com.mdms.backend.entity.Material;
import com.mdms.backend.entity.Ticket;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;

@Getter
public class NeedsDto {

    @NotNull(message = "material id is required")
    private Long materialId;
    @NotNull(message = "quantity is required")
    private int quantity;

    private String affectation = "";
}
