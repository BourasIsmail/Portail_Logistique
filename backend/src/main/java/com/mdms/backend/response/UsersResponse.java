package com.mdms.backend.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UsersResponse {
    private Long id;
    private String service;
    private String email;
    private String division;
}
