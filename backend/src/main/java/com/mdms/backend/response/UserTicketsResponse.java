package com.mdms.backend.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class TicketsResponse {
    private Long id;
    private String ticketDescription;
    private String ticketStatus;
    private String user;
    private String category;
    private String date;
    private String needs;
}
