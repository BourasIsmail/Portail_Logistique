package com.mdms.backend.gestionmarche.backend.controller;

import com.mdms.backend.gestionmarche.backend.dtos.*;
import com.mdms.backend.gestionmarche.backend.entity.*;
import com.mdms.backend.gestionmarche.backend.repository.*;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
class Controller {

    private final ContratRepository contratRepository;
    private final RubriqueRepository rubriqueRepository;
    private final TypeBudgetRepository typeBudgetRepository;
    private final MarcheRepository marcheRepository;
    private final SituationMarcheRepository situationMarcheRepository;
    private final BonCommandeRepository bonCommandeRepository;
    private final PMNRepository pMNRepository;
    private final SituationBCRepository situationBCRepository;
    private final AppelOffreRepository appelOffreRepository;
    private final TypeAORepository typeAORepository;

    Controller(ContratRepository contratRepository, RubriqueRepository rubriqueRepository, TypeBudgetRepository typeBudgetRepository, MarcheRepository marcheRepository, SituationMarcheRepository situationMarcheRepository, BonCommandeRepository bonCommandeRepository, PMNRepository pMNRepository, SituationBCRepository situationBCRepository, AppelOffreRepository appelOffreRepository, TypeAORepository typeAORepository) {
        this.contratRepository = contratRepository;
        this.rubriqueRepository = rubriqueRepository;
        this.typeBudgetRepository = typeBudgetRepository;
        this.marcheRepository = marcheRepository;
        this.situationMarcheRepository = situationMarcheRepository;
        this.bonCommandeRepository = bonCommandeRepository;
        this.pMNRepository = pMNRepository;
        this.situationBCRepository = situationBCRepository;
        this.appelOffreRepository = appelOffreRepository;
        this.typeAORepository = typeAORepository;
    }

    @GetMapping("get-all-contracts")
    public ResponseEntity<?> getAllContracts() {
        return ResponseEntity.ok().body(contratRepository.findAll());
    }
    @GetMapping("get-contract/{id}")
    public ResponseEntity<?> getContractById(@PathVariable(name = "id") Long id) {
        System.out.println("id: " + id);
        if(!contratRepository.existsById(id)){
            return ResponseEntity.badRequest().body("contract doesn't exist");
        }
        return ResponseEntity.ok().body(contratRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("contract not found")) );
    }
    @PostMapping("add-contract")
    public ResponseEntity<?> addContract(@RequestBody ContractRequest request) {

        Contrat contract = new Contrat();
        contract.setReference(request.getReference());
        contract.setDescription(request.getDescription());
        contract.setAnneeBudgetaire(request.getAnneeBudgetaire());
        contract.setAttributaire(request.getAttributaire());
        contract.setDateDebut(request.getDateDebut());
        contract.setDateFin(request.getDateFin());
        contract.setDateSignature(request.getDateSignature());
        contract.setMontant(request.getMontant());
        contract.setNumCompte(request.getNumCompte());
        contract.setObjet(request.getObjet());
        contract.setStatut(request.getStatut());
        try{
            Rubrique rubrique = rubriqueRepository.findById(request.getRubriqueId()).
                    orElseThrow(()-> new RuntimeException("rubrique not found"));
            contract.setRubrique(rubrique);

            TypeBudget typeBudget = typeBudgetRepository.findById(request.getTypeBudgetId())
                    .orElseThrow(()-> new RuntimeException("type budget not found"));
            contract.setTypeBudget(typeBudget);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        contract = contratRepository.save(contract);

        return ResponseEntity.ok().body(contract);
    }
    @PutMapping("update-contract/{id}")
    public ResponseEntity<?> updateContract(@PathVariable(name = "id") Long id, @RequestBody ContractRequest request) {

        Contrat contract = contratRepository.findById(id).orElseThrow(()-> new RuntimeException("contract not found"));
        if(contratRepository.existsByReference(request.getReference()) && !contract.getReference().equals(request.getReference())){
            return ResponseEntity.badRequest().body("contract with this refrence already exist");
        }
        contract.setReference(request.getReference());
        contract.setAnneeBudgetaire(request.getAnneeBudgetaire());
        contract.setDescription(request.getDescription());
        contract.setAttributaire(request.getAttributaire());
        contract.setDateDebut(request.getDateDebut());
        contract.setDateFin(request.getDateFin());
        contract.setDateSignature(request.getDateSignature());
        contract.setMontant(request.getMontant());
        contract.setNumCompte(request.getNumCompte());
        contract.setObjet(request.getObjet());
        contract.setStatut(request.getStatut());
        try{
            Rubrique rubrique = rubriqueRepository.findById(request.getRubriqueId()).
                    orElseThrow(()-> new RuntimeException("rubrique not found"));
            contract.setRubrique(rubrique);

            TypeBudget typeBudget = typeBudgetRepository.findById(request.getTypeBudgetId())
                    .orElseThrow(()-> new RuntimeException("type budget not found"));
            contract.setTypeBudget(typeBudget);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        contract = contratRepository.save(contract);

        return ResponseEntity.ok().body(contract);
    }
    @DeleteMapping("delete-contract/{id}")
    @RolesAllowed("ROLE_ADMIN")
    public ResponseEntity<?> deleteContract(@PathVariable(name = "id") Long id) {
        if(!contratRepository.existsById(id)){
            return ResponseEntity.badRequest().body("contract doesn't exist");
        }
        contratRepository.deleteById(id);
        return ResponseEntity.ok().body("contract deleted");
    }

    @GetMapping("get-all-marches")
    public ResponseEntity<?> getAllMarches() {
        return ResponseEntity.ok().body(marcheRepository.findAll());
    }
    @GetMapping("get-marche/{id}")
    public ResponseEntity<?> getMarcheById(@PathVariable(name = "id") Long id) {
        if(!marcheRepository.existsById(id)){
            return ResponseEntity.badRequest().body("marche doesn't exist");
        }

        return ResponseEntity.ok().body(marcheRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("marche not found")) );
    }
    @PostMapping("add-marche")
    public ResponseEntity<?> addMarche(@RequestBody MarcheRequest request) {
        if (marcheRepository.existsByReferenceMarche(request.getReferenceMarche())) {
            return ResponseEntity.badRequest().body("marche with the same reference already exist");
        }

        Marche marche = new Marche();
        marche.setAnneeBudgetaire(request.getAnneeBudgetaire());
        marche.setAttributaire(request.getAttributaire());
        marche.setDateApprobation(request.getDateApprobation());
        marche.setDateNotificationApprobation(request.getDateNotificationApprobation());
        marche.setDateOrdreService(request.getDateOrdreService());
        marche.setDateVisa(request.getDateVisa());
        marche.setDelaiExecution(request.getDelaiExecution());
        marche.setMontantMarche(request.getMontantMarche());
        marche.setNumCompte(request.getNumCompte());
        marche.setTypeBudgetInv(request.getTypeBudgetInv());
        marche.setObjet(request.getObjet());
        marche.setReferenceMarche(request.getReferenceMarche());
        AppelOffre appelOffre = null;
        try{
            TypeBudget typeBudget = typeBudgetRepository.findById(request.getTypeBudgetId())
                    .orElseThrow(() -> new RuntimeException("type budget not found"));
            marche.setTypeBudget(typeBudget);

            Rubrique rubrique = rubriqueRepository.findById(request.getRubriqueId())
                    .orElseThrow(() -> new RuntimeException("rubrique not found"));
            marche.setRubrique(rubrique);

            if(request.getAppelOffreId() != null){
                appelOffre = appelOffreRepository.findById(request.getAppelOffreId())
                        .orElseThrow(() -> new RuntimeException("appel offre not found"));
                marche.setAppelOffre(appelOffre);
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        marche = marcheRepository.save(marche);

        if(appelOffre != null){
            appelOffre.getMarches().add(marche);
            appelOffreRepository.save(appelOffre);
        }

        List<SituationMarche> situationMarches = new ArrayList<>();
        for (SituationMarcheRequest situationMarche : request.getSituationMarches()) {
            SituationMarche sm = new SituationMarche();
            sm.setDateEnregistrement(situationMarche.getDateEnregistrement());
            sm.setDateLiquidation(situationMarche.getDateLiquidation());
            sm.setDateLivraison(situationMarche.getDateLivraison());
            sm.setDateReceptionProvisoire(situationMarche.getDateReceptionProvisoire());
            sm.setDateServiceFait(situationMarche.getDateServiceFait());
            sm.setNumFacture(situationMarche.getNumFacture());
            sm.setNumDecompte(situationMarche.getNumDecompte());
            sm.setMontantDecompte(situationMarche.getMontantDecompte());
            sm.setPaye(situationMarche.getPaye());
            sm.setObservation(situationMarche.getObservation());
            sm.setMarche(marche);
            sm = situationMarcheRepository.save(sm);
            situationMarches.add(sm);
        }

        marche.setSituationMarches(situationMarches);
        marche = marcheRepository.save(marche);

        return ResponseEntity.ok().body(marche);
    }
    @PutMapping("update-marche/{id}")
    public ResponseEntity<?> updateMarche(@PathVariable(name = "id") Long id, @RequestBody MarcheRequest request) {
        // Check uniqueness of reference
        if (marcheRepository.existsByReferenceMarche(request.getReferenceMarche()) &&
                !marcheRepository.findById(id).get().getReferenceMarche().equals(request.getReferenceMarche())) {
            return ResponseEntity.badRequest().body("marche with the same reference already exist");
        }
        Marche marche;
        try {
            marche = marcheRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("marche not found"));
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        // Update basic fields
        marche.setAnneeBudgetaire(request.getAnneeBudgetaire());
        marche.setAttributaire(request.getAttributaire());
        marche.setDateApprobation(request.getDateApprobation());
        marche.setDateNotificationApprobation(request.getDateNotificationApprobation());
        marche.setDateOrdreService(request.getDateOrdreService());
        marche.setDateVisa(request.getDateVisa());
        marche.setDelaiExecution(request.getDelaiExecution());
        marche.setMontantMarche(request.getMontantMarche());
        marche.setTypeBudgetInv(request.getTypeBudgetInv());
        marche.setNumCompte(request.getNumCompte());
        marche.setObjet(request.getObjet());
        marche.setReferenceMarche(request.getReferenceMarche());

        AppelOffre appelOffre = null;

        // Set relations
        try{
            TypeBudget typeBudget = typeBudgetRepository.findById(request.getTypeBudgetId())
                    .orElseThrow(() -> new RuntimeException("type budget not found"));
            marche.setTypeBudget(typeBudget);

            Rubrique rubrique = rubriqueRepository.findById(request.getRubriqueId())
                    .orElseThrow(() -> new RuntimeException("rubrique not found"));
            marche.setRubrique(rubrique);

            if(request.getAppelOffreId() != null){
                appelOffre = appelOffreRepository.findById(request.getAppelOffreId())
                        .orElseThrow(() -> new RuntimeException("appel offre not found"));
                marche.setAppelOffre(appelOffre);
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        // Ensure existing list is initialized
        if (marche.getSituationMarches() == null) {
            marche.setSituationMarches(new ArrayList<>());
        }

        // Clear and refill the list in-place to avoid orphan removal issue
        marche.getSituationMarches().clear();

        for (SituationMarcheRequest situationMarche : request.getSituationMarches()) {
            SituationMarche sm;

            // Update existing or create new SituationMarche
            if (situationMarche.getId() != null &&
                    situationMarcheRepository.existsById(situationMarche.getId())) {
                sm = situationMarcheRepository.findById(situationMarche.getId())
                        .orElseThrow(() -> new RuntimeException("situation marche not found"));
            } else {
                sm = new SituationMarche();
            }

            sm.setDateEnregistrement(situationMarche.getDateEnregistrement());
            sm.setDateLiquidation(situationMarche.getDateLiquidation());
            sm.setDateLivraison(situationMarche.getDateLivraison());
            sm.setDateReceptionProvisoire(situationMarche.getDateReceptionProvisoire());
            sm.setDateServiceFait(situationMarche.getDateServiceFait());
            sm.setNumFacture(situationMarche.getNumFacture());
            sm.setNumDecompte(situationMarche.getNumDecompte());
            sm.setMontantDecompte(situationMarche.getMontantDecompte());
            sm.setPaye(situationMarche.getPaye());
            sm.setObservation(situationMarche.getObservation());
            sm.setMarche(marche); // Important to set back-reference

            marche.getSituationMarches().add(sm); // Add to list
        }

        // Save the Marche (cascades to SituationMarche if configured)
        marche = marcheRepository.save(marche);

        if (appelOffre != null) {
            appelOffre.getMarches().add(marche);
            appelOffreRepository.save(appelOffre);
        }

        return ResponseEntity.ok().body(marche);
    }
    @DeleteMapping("delete-marche/{id}")
    @RolesAllowed("ROLE_ADMIN")
    public ResponseEntity<?> deleteMarche(@PathVariable(name = "id") Long id) {
        if(!marcheRepository.existsById(id)){
            return ResponseEntity.badRequest().body("marche doesn't exist");
        }

        Marche marche = marcheRepository.findById(id).get();

        if(marche.getAppelOffre() != null){
            marche.getAppelOffre().getMarches().remove(marche);
            appelOffreRepository.save(marche.getAppelOffre());
        }

        marcheRepository.delete(marche);
        return ResponseEntity.ok().body("marche deleted");
    }

    @GetMapping("get-all-bon-commandes")
    public ResponseEntity<?> getAllBonCommandes() {
        return ResponseEntity.ok().body(bonCommandeRepository.findAll());
    }
    @GetMapping("get-bon-commande/{id}")
    public ResponseEntity<?> getBonCommandeById(@PathVariable(name = "id") Long id) {
        if(!bonCommandeRepository.existsById(id)){
            return ResponseEntity.badRequest().body("bon commande doesn't exist");
        }
        return ResponseEntity.ok().body(bonCommandeRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("bon commande not found")) );
    }
    @PostMapping("add-bon-commande")
    public ResponseEntity<?> addBC(@RequestBody BonCommandeRequest request){
        if(bonCommandeRepository.existsByNumBC(request.getNumBC())){
            return ResponseEntity.badRequest().body("bon commande with this num already exist");
        }
        BonCommande bonCommande = new BonCommande();

        bonCommande.setAnneeBudgetaire(request.getAnneeBudgetaire());
        bonCommande.setAttributaire(request.getAttributaire());
        bonCommande.setDateBC(request.getDateBC());
        bonCommande.setDateNotificationBC(request.getDateNotificationBC());
        bonCommande.setDelaiExecution(request.getDelaiExecution());
        bonCommande.setMontant(request.getMontant());
        bonCommande.setNumBC(request.getNumBC());
        bonCommande.setNumCompte(request.getNumCompte());

        try {
            Rubrique rubrique = rubriqueRepository.findById(request.getRubriqueId())
                    .orElseThrow(() -> new RuntimeException("rubrique not found"));
            bonCommande.setRubrique(rubrique);

            PMN pmn = pMNRepository.findById(request.getPmnId())
                    .orElseThrow(() -> new RuntimeException("PMN not found"));
            bonCommande.setPmn(pmn);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        bonCommande = bonCommandeRepository.save(bonCommande);
        List<SituationBC> situationBCS = new ArrayList<>();
        for (SituationBCRequest situationBCRequest : request.getSituationBCs()){
            SituationBC situationBC = new SituationBC();

            situationBC.setDateEnregistrement(situationBCRequest.getDateEnregistrement());
            situationBC.setDateLiquidation(situationBCRequest.getDateLiquidation());
            situationBC.setDateLivraison(situationBCRequest.getDateLivraison());
            situationBC.setDateReceptionProvisoire(situationBCRequest.getDateReceptionProvisoire());
            situationBC.setDateServiceFait(situationBCRequest.getDateServiceFait());

            situationBC.setMontantFacture(situationBCRequest.getMontantFacture());
            situationBC.setNumFacture(situationBCRequest.getNumFacture());
            situationBC.setObservation(situationBCRequest.getObservation());
            situationBC.setPaye(situationBCRequest.isPaye());

            situationBC.setBonCommande(bonCommande);
            situationBC = situationBCRepository.save(situationBC);

            situationBCS.add(situationBC);
        }

        bonCommande.setSituationBCs(situationBCS);
        bonCommande = bonCommandeRepository.save(bonCommande);

        return ResponseEntity.ok().body(bonCommande);
    }
    @PutMapping("update-bon-commande/{id}")
    public ResponseEntity<?> updateBC(@PathVariable(name = "id") Long id, @RequestBody BonCommandeRequest request) {
        if (bonCommandeRepository.existsByNumBC(request.getNumBC()) && !bonCommandeRepository.findById(id).get().getNumBC().equals(request.getNumBC())) {
            return ResponseEntity.badRequest().body("bon commande with this num already exist");
        }
        BonCommande bonCommande;
        try {
            bonCommande = bonCommandeRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("bon commande not found"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        bonCommande.setAnneeBudgetaire(request.getAnneeBudgetaire());
        bonCommande.setAttributaire(request.getAttributaire());
        bonCommande.setDateBC(request.getDateBC());
        bonCommande.setDateNotificationBC(request.getDateNotificationBC());
        bonCommande.setDelaiExecution(request.getDelaiExecution());
        bonCommande.setMontant(request.getMontant());
        bonCommande.setNumBC(request.getNumBC());
        bonCommande.setNumCompte(request.getNumCompte());
        try {
            Rubrique rubrique = rubriqueRepository.findById(request.getRubriqueId())
                    .orElseThrow(() -> new RuntimeException("rubrique not found"));
            bonCommande.setRubrique(rubrique);

            PMN pmn = pMNRepository.findById(request.getPmnId())
                    .orElseThrow(() -> new RuntimeException("PMN not found"));
            bonCommande.setPmn(pmn);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        if(bonCommande.getSituationBCs() == null){
            bonCommande.setSituationBCs(new ArrayList<>());
        }

        bonCommande.getSituationBCs().clear();
        for (SituationBCRequest situationBCRequest : request.getSituationBCs()){
            SituationBC situationBC;
            if(situationBCRequest.getId() != null && situationBCRepository.existsById(situationBCRequest.getId())){
                situationBC = situationBCRepository.findById(situationBCRequest.getId())
                        .orElseThrow(() -> new RuntimeException("situation BC not found"));
            } else {
                situationBC = new SituationBC();
            }

            situationBC.setDateEnregistrement(situationBCRequest.getDateEnregistrement());
            situationBC.setDateLiquidation(situationBCRequest.getDateLiquidation());
            situationBC.setDateLivraison(situationBCRequest.getDateLivraison());
            situationBC.setDateReceptionProvisoire(situationBCRequest.getDateReceptionProvisoire());
            situationBC.setDateServiceFait(situationBCRequest.getDateServiceFait());

            situationBC.setMontantFacture(situationBCRequest.getMontantFacture());
            situationBC.setNumFacture(situationBCRequest.getNumFacture());
            situationBC.setObservation(situationBCRequest.getObservation());
            situationBC.setPaye(situationBCRequest.isPaye());
            situationBC.setBonCommande(bonCommande);

            bonCommande.getSituationBCs().add(situationBC);
        }

        bonCommande = bonCommandeRepository.save(bonCommande);

        return ResponseEntity.ok().body(bonCommande);
    }
    @DeleteMapping("delete-bon-commande/{id}")
    @RolesAllowed("ROLE_ADMIN")
    public ResponseEntity<?> deleteBC(@PathVariable(name = "id") Long id) {
        if(!bonCommandeRepository.existsById(id)){
            return ResponseEntity.badRequest().body("bon commande doesn't exist");
        }
        bonCommandeRepository.deleteById(id);
        return ResponseEntity.ok().body("bon commande deleted");
    }

    @GetMapping("get-all-appel-offres")
    public ResponseEntity<?> getAllAppelOffre(){return ResponseEntity.ok().body(appelOffreRepository.findAll());}
    @GetMapping("get-appel-offre/{id}")
    public ResponseEntity<?> getAppelOffreById(@PathVariable(name = "id") Long id){
        if(!appelOffreRepository.existsById(id)){
            return ResponseEntity.badRequest().body("appel offre doesn't exist");
        }
        return ResponseEntity.ok().body(appelOffreRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("appel offre not found")));
    }
    @PostMapping("add-appel-offre")
    public ResponseEntity<?> addAO(@RequestBody AppelOffreRequest request){
    
        AppelOffre appelOffre = new AppelOffre();

        appelOffre.setReference(request.getReference());
        appelOffre.setAnneeBudgetaire(request.getAnneeBudgetaire());
        appelOffre.setEstimation(request.getEstimation());
        appelOffre.setObjet(request.getObjet());
        appelOffre.setAttributaire(request.getAttributaire());
        appelOffre.setMontant(request.getMontant());

        appelOffre.setDatePublication(request.getDatePublication());
        appelOffre.setDateOuverture(request.getDateOuverture());
        appelOffre.setDateFinTravaux(request.getDateFinTravaux());
        appelOffre.setDateNotificationApprobation(request.getDateNotificationApprobation());

        try {
            Rubrique rubrique = rubriqueRepository.findById(request.getRubriqueId())
                    .orElseThrow(() -> new RuntimeException("rubrique not found"));
            appelOffre.setRubrique(rubrique);

            TypeAO ao = typeAORepository.findById(request.getTypeAOId())
                    .orElseThrow(() -> new RuntimeException("type AO not found"));
            appelOffre.setTypeAO(ao);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        appelOffre = appelOffreRepository.save(appelOffre);

        return ResponseEntity.ok().body(appelOffre);
    }
    @PutMapping("update-appel-offre/{id}")
    public ResponseEntity<?> updateAO(@PathVariable(name = "id") Long id, @RequestBody AppelOffreRequest request) {
        if (appelOffreRepository.existsByReference(request.getReference()) && !appelOffreRepository.findById(id).get().getReference().equals(request.getReference())) {
            return ResponseEntity.badRequest().body("appel offre with this refrence already exist");
        }
        AppelOffre appelOffre;
        try {
            appelOffre = appelOffreRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("appel offre not found"));

            appelOffre.setReference(request.getReference());
            appelOffre.setAnneeBudgetaire(request.getAnneeBudgetaire());
            appelOffre.setEstimation(request.getEstimation());
            appelOffre.setObjet(request.getObjet());
            appelOffre.setAttributaire(request.getAttributaire());
            appelOffre.setMontant(request.getMontant());

            appelOffre.setDatePublication(request.getDatePublication());
            appelOffre.setDateOuverture(request.getDateOuverture());
            appelOffre.setDateFinTravaux(request.getDateFinTravaux());
            appelOffre.setDateNotificationApprobation(request.getDateNotificationApprobation());

            Rubrique rubrique = rubriqueRepository.findById(request.getRubriqueId())
                    .orElseThrow(() -> new RuntimeException("rubrique not found"));
            appelOffre.setRubrique(rubrique);
            TypeAO ao = typeAORepository.findById(request.getTypeAOId())
                    .orElseThrow(() -> new RuntimeException("type AO not found"));
            appelOffre.setTypeAO(ao);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        appelOffre = appelOffreRepository.save(appelOffre);
        return ResponseEntity.ok().body(appelOffre);
    }
    @DeleteMapping("delete-appel-offre/{id}")
    @RolesAllowed("ROLE_ADMIN")
    public ResponseEntity<?> deleteAO(@PathVariable(name = "id") Long id) {
        if(!appelOffreRepository.existsById(id)){
            return ResponseEntity.badRequest().body("appel offre doesn't exist");
        }
        appelOffreRepository.deleteById(id);
        return ResponseEntity.ok().body("appel offre deleted");
    }
}

