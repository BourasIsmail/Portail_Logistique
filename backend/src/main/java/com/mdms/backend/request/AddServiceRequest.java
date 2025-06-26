package com.mdms.backend.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;

@Getter
public class AddServiceRequest {
    @NotBlank(message = "service name is required")
    private String serviceName;

    @NotNull(message = "division id is required")
    private Long divId;
}
