package com.mdms.backend.entity;

import com.mdms.backend.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DbInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if(userRepository.count() == 0L){
            User admin = new User("admin", "admin@admin.com", passwordEncoder.encode("admin"), null);
            admin.setRole(Roles.ROLE_ADMIN);

            userRepository.save(admin);
            System.out.println("Admin created");
        }
    }
}
