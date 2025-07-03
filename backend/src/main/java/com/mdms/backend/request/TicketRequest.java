package com.mdms.backend.request;

import com.mdms.backend.entity.Needs;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Getter
public class TicketRequest {
    private String ticketDesc;

    @NotNull(message = "category id is required")
    private Long ctgrId;

    private String observation = "";

    @NotEmpty(message = "at least one need is required")
    private List<NeedsDto> needs;
}
