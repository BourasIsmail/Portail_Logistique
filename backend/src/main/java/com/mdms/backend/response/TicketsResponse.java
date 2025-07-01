package com.mdms.backend.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TicketsResponse {
    private Long id;
    private String ticketDescription;
    private String ticketStatus;
    private String service;
    private String category;
    private String date;
    private String needs;
    private String note;
    private boolean isArchived;
}
