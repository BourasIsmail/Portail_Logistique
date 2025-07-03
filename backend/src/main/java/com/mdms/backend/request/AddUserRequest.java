package com.mdms.backend.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;

@Getter
public class AddUserRequest {

    @NotBlank(message = "username is required")
    private String name;

    @NotBlank(message = "email is required")
    @Email
    private String email;

    @NotBlank(message = "password is required")
    private String password;

    @NotNull(message = "division name is required")
    private String division;
}
