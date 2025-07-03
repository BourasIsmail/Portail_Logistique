package com.mdms.backend.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor

public class NeedResponse {
    private String name;
    private int quantity;
    private String affectation = "";
}

