package com.mdms.backend.parcauto.service;

import com.mdms.backend.parcauto.dto.MoyenPaiementDto;
import com.mdms.backend.parcauto.entity.BadgeJawaz;
import com.mdms.backend.parcauto.entity.CarteCarburant;
import com.mdms.backend.parcauto.entity.MoyenPaiement;
import com.mdms.backend.parcauto.entity.Vignette;
import com.mdms.backend.parcauto.repository.MoyenPaiementRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.mdms.backend.parcauto.repository.DepenseRepository; 
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
@Service
public class MoyenPaiementService {

    @Autowired
    private MoyenPaiementRepository moyenPaiementRepository;

    // --- READ ---
    @Transactional(readOnly = true)
    public Page<MoyenPaiementDto> findAll(String query, Pageable pageable) {
                Page<MoyenPaiement> moyenPaiementPage;
        
        if (query != null && !query.trim().isEmpty()) {
            // Si une recherche est effectuée, on utilise la nouvelle méthode
            moyenPaiementPage = moyenPaiementRepository.searchByNumeroOrFournisseur(query.trim(), pageable);
        } else {
            // Sinon, on liste tout
            moyenPaiementPage = moyenPaiementRepository.findAllWithDetails(pageable);
        }
        
        return moyenPaiementPage.map(this::convertToDto);
    }


    public Optional<MoyenPaiementDto> findById(Long id) {
        return moyenPaiementRepository.findById(id).map(this::convertToDto);
    }

    // --- CREATE ---
    public MoyenPaiement create(MoyenPaiementDto dto) {
        MoyenPaiement moyenPaiement;


        //comparaison entre le type de carte carburant et le typeClasse
        if ("CarteCarburant".equalsIgnoreCase(dto.getTypeClasse())) {
            CarteCarburant carte = new CarteCarburant();
            carte.setType(dto.getTypeCarte());
            carte.setPlafondOuValeur(dto.getPlafondOuValeur());
            moyenPaiement = carte;
        } else if ("BadgeJawaz".equalsIgnoreCase(dto.getTypeClasse())) {
            BadgeJawaz badge = new BadgeJawaz();
            badge.setSolde(dto.getSolde());
            moyenPaiement = badge;
        } else if ("Vignette".equalsIgnoreCase(dto.getTypeClasse())) {
            Vignette vignette = new Vignette();
            vignette.setMontantDisponible(dto.getMontantDisponible());
            vignette.setTypeUtilisation(dto.getTypeUtilisation());
            moyenPaiement = vignette;
        } else {
            throw new IllegalArgumentException("Type de moyen de paiement inconnu : " + dto.getTypeClasse());
        }

    
        moyenPaiement.setNumero(dto.getNumero());
        moyenPaiement.setFournisseur(dto.getFournisseur());
        moyenPaiement.setStatut(dto.getStatut());

        return moyenPaiementRepository.save(moyenPaiement);
    }


      @Autowired
    private DepenseRepository depenseRepository;
    // --- DELETE ---
     @Transactional 
    public void delete(Long id) {
        if (!moyenPaiementRepository.existsById(id)) {
            throw new EntityNotFoundException("Moyen de paiement non trouvé avec l'ID : " + id);
        }
        long countDepenses = depenseRepository.countByMoyenPaiementUtiliseId(id);

        if (countDepenses > 0) {
            throw new IllegalStateException("Impossible de supprimer ce moyen de paiement car il est lié à " 
                                            + countDepenses + " dépense(s) existante(s).");}

          moyenPaiementRepository.deleteById(id);
        }
    
    // --- UPDATE ---
    public MoyenPaiement Update(Long id ,MoyenPaiementDto dto ){

        MoyenPaiement paiemment = moyenPaiementRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Moyen de paiement non trouvé avec l'ID : " + id));
        
        paiemment.setNumero(dto.getNumero());
        paiemment.setFournisseur(dto.getFournisseur());
        paiemment.setStatut(dto.getStatut());
        
         if (paiemment instanceof CarteCarburant carte) {
            carte.setType(dto.getTypeCarte());
            carte.setPlafondOuValeur(dto.getPlafondOuValeur());
          } else if (paiemment instanceof BadgeJawaz badge) {
            badge.setSolde(dto.getSolde());
          } else if (paiemment instanceof Vignette vignette) { 
            vignette.setMontantDisponible(dto.getMontantDisponible());
            vignette.setTypeUtilisation(dto.getTypeUtilisation());
        }
           return moyenPaiementRepository.save(paiemment);
        }

    // --- UTILITAIRE DE CONVERSION ---
    private MoyenPaiementDto convertToDto(MoyenPaiement moyenPaiement) {
        MoyenPaiementDto dto = new MoyenPaiementDto();
        dto.setId(moyenPaiement.getId());
        dto.setNumero(moyenPaiement.getNumero());
        dto.setFournisseur(moyenPaiement.getFournisseur());
        dto.setStatut(moyenPaiement.getStatut());
        dto.setTypeClasse(moyenPaiement.getClass().getSimpleName());

        // Utilisation du "pattern matching" de Java 17+ pour un code plus propre
        if (moyenPaiement instanceof CarteCarburant carte) {
            dto.setTypeCarte(carte.getType());
            dto.setPlafondOuValeur(carte.getPlafondOuValeur());
        } else if (moyenPaiement instanceof BadgeJawaz badge) {
            dto.setSolde(badge.getSolde());
        } else if (moyenPaiement instanceof Vignette vignette) {
            dto.setMontantDisponible(vignette.getMontantDisponible());
            dto.setTypeUtilisation(vignette.getTypeUtilisation());
        }
        return dto;
    }


    @Transactional(readOnly = true)
public List<MoyenPaiementDto> findAllForSelect() {
    return moyenPaiementRepository.findAllForSelect(Sort.by("fournisseur").ascending())
            .stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
}
}