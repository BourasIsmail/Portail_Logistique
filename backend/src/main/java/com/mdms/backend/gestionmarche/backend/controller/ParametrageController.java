package com.mdms.backend.gestionmarche.backend.controller;

import com.mdms.backend.gestionmarche.backend.entity.PMN;
import com.mdms.backend.gestionmarche.backend.entity.Rubrique;
import com.mdms.backend.gestionmarche.backend.entity.TypeAO;
import com.mdms.backend.gestionmarche.backend.entity.TypeBudget;
import com.mdms.backend.gestionmarche.backend.repository.PMNRepository;
import com.mdms.backend.gestionmarche.backend.repository.RubriqueRepository;
import com.mdms.backend.gestionmarche.backend.repository.TypeAORepository;
import com.mdms.backend.gestionmarche.backend.repository.TypeBudgetRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
class ParametrageController {

    private final TypeBudgetRepository typeBudgetRepository;
    private final RubriqueRepository rubriqueRepository;
    private final PMNRepository pmnRepository;
    private final TypeAORepository typeAORepository;

    ParametrageController(TypeBudgetRepository typeBudgetRepository, RubriqueRepository rubriqueRepository, PMNRepository pmnRepository, TypeAORepository typeAORepository) {
        this.typeBudgetRepository = typeBudgetRepository;
        this.rubriqueRepository = rubriqueRepository;
        this.pmnRepository = pmnRepository;
        this.typeAORepository = typeAORepository;
    }

    @GetMapping("/test-gm")
    public ResponseEntity<?> testGm() {
        return ResponseEntity.ok().body("test gestion de marche");
    }

    @GetMapping("/get-all-type-budget")
    public ResponseEntity<?> getAllTypeBudget() {
        return ResponseEntity.ok().body(typeBudgetRepository.findAll());
    }
    @PostMapping("/add-type-budget")
    public ResponseEntity<?> addTypeBudget(@RequestBody Map<String, ?> request) {
        if(typeBudgetRepository.existsByName((String) request.get("name"))){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body("type budget exist deja");
        }
        TypeBudget typeBudget = typeBudgetRepository.save(new TypeBudget(null, (String) request.get("name")));

        return ResponseEntity.ok().body(typeBudget);
    }
    @PutMapping("/update-type-budget/{name}")
    public ResponseEntity<?> updateTypeBudget(@PathVariable(name = "name") String name, @RequestBody Map<String, ?> request) {
        if(!typeBudgetRepository.existsByName(name)){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body("type budget doesn't exist");
        }
        TypeBudget typeBudget = typeBudgetRepository.findByName(name);

        typeBudget.setName((String) request.get("name"));

        typeBudget = typeBudgetRepository.save(typeBudget);

        return ResponseEntity.ok().body(typeBudget);
    }
    @DeleteMapping("/delete-type-budget/{name}")
    public ResponseEntity<?> deleteTypeBudget(@PathVariable(name = "name") String name) {
        if(!typeBudgetRepository.existsByName(name)){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body("type budget doesn't exist");
        }
        TypeBudget typeBudget = typeBudgetRepository.findByName(name);

        typeBudgetRepository.delete(typeBudget);

        return ResponseEntity.ok().body(typeBudget);
    }


    @GetMapping("/get-all-rubrique")
    public ResponseEntity<?> getAllRubrique() {
        List<Rubrique> rubriques = rubriqueRepository.findAll();
        List<Map<String, ?>> resposne = new ArrayList<>();
        for(Rubrique rubrique : rubriques){
            Map<String, ?> map = Map.of("id", rubrique.getId(),"nCompte", rubrique.getNCompte(),
                    "rubrique", rubrique.getRubrique());
            resposne.add(map);
        }
        return ResponseEntity.ok().body(resposne);
    }
    @PostMapping("/add-rubrique")
    public ResponseEntity<?> addRubrique(@RequestBody Map<String, ?> request) {
        if(rubriqueRepository.existsByRubrique((String) request.get("rubrique"))){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body("rubrique already exist");
        }

        Rubrique rubrique = new Rubrique();
        rubrique.setNCompte((String) request.get("nCompte"));
        rubrique.setRubrique((String) request.get("rubrique"));
        rubrique = rubriqueRepository.save(rubrique);

        return ResponseEntity.ok().body(rubrique);
    }
    @PutMapping("/update-rubrique/{rub}")
    public ResponseEntity<?> updateRubrique(@PathVariable(name = "rub") String rub, @RequestBody Map<String, ?> request) {
        if(!rubriqueRepository.existsByRubrique(rub)){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body("rubrique doesn't exist");
        }

        Rubrique rubrique = rubriqueRepository.findByRubrique(rub);

        rubrique.setNCompte((String) request.get("nCompte"));
        rubrique.setRubrique((String) request.get("rubrique"));

        rubrique = rubriqueRepository.save(rubrique);
        return ResponseEntity.ok().body(rubrique);
    }
    @DeleteMapping("/delete-rubrique/{rub}")
    public ResponseEntity<?> deleteRubrique(@PathVariable(name = "rub") String rub) {
        if(!rubriqueRepository.existsByRubrique(rub)){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body("rubrique doesn't exist");
        }
        Rubrique rubrique = rubriqueRepository.findByRubrique(rub);

        rubriqueRepository.delete(rubrique);

        return ResponseEntity.ok().body("rubrique deleted successfully");
    }


    @GetMapping("/get-all-pmn")
    public ResponseEntity<?> getAllPMN() {
        return ResponseEntity.ok().body(pmnRepository.findAll());
    }
    @PostMapping("/add-pmn")
    public ResponseEntity<?> addPMN(@RequestBody Map<String, ?> request) {
        if(pmnRepository.existsByNum((String) request.get("num"))){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body("PMN already exist");
        }

        PMN pmn = new PMN();
        pmn.setNum((String) request.get("num"));
        pmn.setObjet((String) request.get("objet"));
        pmn.setMontant((Number) request.get("montant"));

        pmn = pmnRepository.save(pmn);

        return ResponseEntity.ok().body(pmn);
    }
    @PutMapping("/update-pmn/{num}")
    public ResponseEntity<?> updatePMN(@PathVariable(name = "num") String num, @RequestBody Map<String, ?> request) {
        if(!pmnRepository.existsByNum(num)){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body("PMN doesn't exist");
        }

        PMN pmn = pmnRepository.findByNum(num);
        pmn.setNum((String) request.get("num"));
        pmn.setObjet((String) request.get("objet"));
        pmn.setMontant((Number) request.get("montant"));

        pmn = pmnRepository.save(pmn);
        return ResponseEntity.ok().body(pmn);
    }
    @DeleteMapping("/delete-pmn/{num}")
    public ResponseEntity<?> deletePMN(@PathVariable(name = "num") String num) {
        if(!pmnRepository.existsByNum(num)){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body("PMN doesn't exist");
        }
        PMN pmn = pmnRepository.findByNum(num);

        pmnRepository.delete(pmn);

        return ResponseEntity.ok().body("PMN deleted successfully");
    }


    @GetMapping("/get-all-typeAO")
    public ResponseEntity<?> getAllTypeAO() {
        return ResponseEntity.ok().body(typeAORepository.findAll());
    }
    @PostMapping("/add-typeAO")
    public ResponseEntity<?> addAO(@RequestBody Map<String, String> request){
        if(typeAORepository.existsByName(request.get("name"))){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body("type AO already exist");
        }
        TypeAO typeAO = new TypeAO();
        typeAO.setName(request.get("name"));
        typeAO = typeAORepository.save(typeAO);
        return ResponseEntity.ok().body(typeAO);
    }
    @PutMapping("/update-typeAO/{name}")
    public ResponseEntity<?> updateTypeAO(@PathVariable(name = "name") String name, @RequestBody Map<String, String> request) {
        if(!typeAORepository.existsByName(name)){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body("type AO doesn't exist");
        }
        TypeAO typeAO = typeAORepository.findByName(name);
        typeAO.setName(request.get("name"));
        typeAO = typeAORepository.save(typeAO);
        return ResponseEntity.ok().body(typeAO);
    }
    @DeleteMapping("/delete-typeAO/{name}")
    public ResponseEntity<?> deleteTypeAO(@PathVariable(name = "name") String name) {
        if(!typeAORepository.existsByName(name)){
            return ResponseEntity.status(HttpServletResponse.SC_BAD_REQUEST).body("type AO doesn't exist");
        }
        TypeAO typeAO = typeAORepository.findByName(name);
        typeAORepository.delete(typeAO);
        return ResponseEntity.ok().body("type AO deleted successfully");
    }
}
