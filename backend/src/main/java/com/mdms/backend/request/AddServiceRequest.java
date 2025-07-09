package com.mdms.backend.request;

import com.mdms.backend.entity.EntityType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;

@Getter
public class AddServiceRequest {
    @NotBlank(message = "service name is required")
    private String serviceName;

    private String type;

    private String parentName;

    private String parentType;
}
