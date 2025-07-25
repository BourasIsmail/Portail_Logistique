package com.mdms.backend.entity;

import com.mdms.backend.gestionmarche.backend.entity.PMN;
import com.mdms.backend.gestionmarche.backend.entity.Rubrique;
import com.mdms.backend.gestionmarche.backend.entity.TypeAO;
import com.mdms.backend.gestionmarche.backend.entity.TypeBudget;
import com.mdms.backend.gestionmarche.backend.repository.PMNRepository;
import com.mdms.backend.gestionmarche.backend.repository.RubriqueRepository;
import com.mdms.backend.gestionmarche.backend.repository.TypeAORepository;
import com.mdms.backend.gestionmarche.backend.repository.TypeBudgetRepository;
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
    @Autowired
    private TypeBudgetRepository typeBudgetRepository;
    @Autowired
    private RubriqueRepository rubriqueRepository;
    @Autowired
    private PMNRepository pMNRepository;
    @Autowired
    private TypeAORepository typeAORepository;

    @Override
    public void run(String... args) throws Exception {
        if(userRepository.count() == 0L){
            User admin = new User("admin", "admin@admin.com", passwordEncoder.encode("admin"), null);
            admin.setRole(Roles.ROLE_ADMIN);

            userRepository.save(admin);
            System.out.println("Admin created");
        }
        if(typeBudgetRepository.count() == 0L){
            typeBudgetRepository.save(new TypeBudget(null, "Budget d'investissement"));
            typeBudgetRepository.save(new TypeBudget(null, "Budget de fonctionnement"));
        }
        if(rubriqueRepository.count() == 0L){
            rubriqueRepository.save(new Rubrique(null, "123456", "Équipement informatique"));
            rubriqueRepository.save(new Rubrique(null, "789012", "Mobilier de bureau"));
            rubriqueRepository.save(new Rubrique(null, "345678", "Fournitures de bureau"));
        }
        if(pMNRepository.count() == 0L){
            pMNRepository.save(new PMN(null, "PMN-2023-001", "Achat de fourniture", 50000.0));
            pMNRepository.save(new PMN(null, "PMN-2023-002", "Équipement technique", 80000.0));
        }
        if(typeAORepository.count() == 0L){
            typeAORepository.save(new TypeAO(null, "Ouvert"));
            typeAORepository.save(new TypeAO(null, "International"));
            typeAORepository.save(new TypeAO(null, "Simplifié"));
        }
    }
}
