package com.mdms.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;


@Entity
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @Setter
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @NotBlank
    @Setter
    @Getter
    @Column(name = "user_name")
    private String userName;

    @NotBlank
    @Setter
    @Getter
    @Email
    @Column(name = "email", unique = true)
    private String email;

    @NotBlank
    @Setter
    @Getter
    @JsonIgnore
    @Column(name = "password")
    private String password;

    @Getter
    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Roles role = Roles.ROLE_USER;

    @Setter
    @Getter
    private boolean enabled = true;

    public void setRole(Roles role) {
        if (role == null) {
            this.role = Roles.ROLE_USER;
        }
        this.role = role;
    }

    public User(String userName, String email, String password) {
        this.userName = userName;
        this.email = email;
        this.password = password;
    }

}
