package com.mdms.backend.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserTicketsResponse {
    private Long id;
    private String ticketDescription;
    private String ticketStatus;
    private String category;
    private String observation;
    private String date;
    private String note;
    private String needs;
}
