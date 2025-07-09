package com.mdms.backend.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UsersResponse {
    private Long id;
    private String name;
    private String email;
    private String type;
    private String parentName;
}
