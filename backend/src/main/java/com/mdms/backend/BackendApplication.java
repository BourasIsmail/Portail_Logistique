package com.mdms.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication


// a ajouter
//Un "robot" qui s'exécute automatiquement à des moments précis
@EnableScheduling

public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
