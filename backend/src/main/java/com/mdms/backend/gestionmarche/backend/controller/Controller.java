package com.mdms.backend.gestionmarche.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/admin")
class Controller {

    @GetMapping("/test-gm")
    public ResponseEntity<?> testGm() {
        return ResponseEntity.ok().body("test gestion de marche");
    }

}
