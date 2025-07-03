package com.mdms.backend.response;

import com.mdms.backend.request.NeedsDto;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Setter
@Getter
public class TicketsResponse {
    private Long id;
    private String ticketDescription;
    private String ticketStatus;
    private String service;
    private String category;
    private Date date;
    private List<NeedResponse> needs;
    private String observation;
    private String note;
    private boolean isArchived;
}
