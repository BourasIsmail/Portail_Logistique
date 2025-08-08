package com.mdms.backend.parcauto.service;

import com.mdms.backend.parcauto.dto.DepenseDto;
import com.mdms.backend.parcauto.entity.*; 
import com.mdms.backend.parcauto.repository.DepenseRepository;
import com.mdms.backend.parcauto.repository.MoyenPaiementRepository;
import com.mdms.backend.parcauto.repository.VehiculeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
@Service
public class DepenseService {

    @Autowired private DepenseRepository depenseRepository;
    @Autowired private VehiculeRepository vehiculeRepository;
    @Autowired private MoyenPaiementRepository moyenPaiementRepository;

    // --- READ ---
    
    @Transactional(readOnly = true)
    public Page<DepenseDto> findAll(String query, Pageable pageable) {
        Page<Depense> depensePage;
        
        if (query != null && !query.trim().isEmpty()) {
            depensePage = depenseRepository.searchByTerm(query.trim(), pageable);
        } else {
            depensePage = depenseRepository.findAllWithDetails(pageable);
        }
        
        return depensePage.map(this::convertToDto);
    }

    @Transactional(readOnly = true)
    public Optional<DepenseDto> findById(Long id) {
        return depenseRepository.findById(id).map(this::convertToDto);
    }
    
    // --- CREATE ---
    @Transactional
    public Depense create(DepenseDto dto) {
        Vehicule vehicule = vehiculeRepository.findById(dto.getVehiculeId())
                .orElseThrow(() -> new EntityNotFoundException("Véhicule non trouvé"));
        MoyenPaiement moyenPaiement = moyenPaiementRepository.findById(dto.getMoyenPaiementId())
                .orElseThrow(() -> new EntityNotFoundException("Moyen de paiement non trouvé"));

        Depense depense;
        
        switch (dto.getTypeDepense().toLowerCase()) {
            case "maintenance":
                Maintenance maintenance = new Maintenance();
                maintenance.setTypeIntervention(dto.getTypeIntervention());
                maintenance.setNomGarage(dto.getNomGarage());
                maintenance.setDescription(dto.getDescription());
                depense = maintenance;
                break;
            case "pleincarburant":
                PleinCarburant plein = new PleinCarburant();
                plein.setLitres(dto.getLitres());
                plein.setKilometrage(dto.getKilometrage());
                depense = plein;
                break;
            case "rechargejawaz":
                depense = new RechargeJawaz();
                break;
            default:
                throw new IllegalArgumentException("Type de dépense inconnu : " + dto.getTypeDepense());
        }

       
        depense.setDate(dto.getDate());
        depense.setMontant(dto.getMontant());
        depense.setJustificatifUrl(dto.getJustificatifUrl());
        depense.setVehicule(vehicule);
        depense.setMoyenPaiementUtilise(moyenPaiement);

        return depenseRepository.save(depense);
    }

    // --- DELETE ---
    @Transactional
    public void delete(Long id) {
        if (!depenseRepository.existsById(id)) {
            throw new EntityNotFoundException("Dépense non trouvée");
        }
        depenseRepository.deleteById(id);
    }

    //--- UPDATE ---
       @Transactional
    public Depense update(Long id, DepenseDto dto) {
       
        Depense depense = depenseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Dépense non trouvée avec l'ID : " + id));
    
        Vehicule vehicule = vehiculeRepository.findById(dto.getVehiculeId())
                .orElseThrow(() -> new EntityNotFoundException("Véhicule non trouvé"));
        MoyenPaiement moyenPaiement = moyenPaiementRepository.findById(dto.getMoyenPaiementId())
                .orElseThrow(() -> new EntityNotFoundException("Moyen de paiement non trouvé"));

       
        depense.setDate(dto.getDate());
        depense.setMontant(dto.getMontant());
        depense.setJustificatifUrl(dto.getJustificatifUrl());
        depense.setVehicule(vehicule);
        depense.setMoyenPaiementUtilise(moyenPaiement);
        
        if (depense instanceof Maintenance maintenance) {
        
            if (!"maintenance".equalsIgnoreCase(dto.getTypeDepense())) {
                throw new IllegalArgumentException("Impossible de changer le type d'une dépense existante.");
            }
            maintenance.setTypeIntervention(dto.getTypeIntervention());
            maintenance.setNomGarage(dto.getNomGarage());
            maintenance.setDescription(dto.getDescription());
        } else if (depense instanceof PleinCarburant plein) {
            if (!"pleincarburant".equalsIgnoreCase(dto.getTypeDepense())) {
                throw new IllegalArgumentException("Impossible de changer le type d'une dépense existante.");
            }
            plein.setLitres(dto.getLitres());
            plein.setKilometrage(dto.getKilometrage());
        } else if (depense instanceof RechargeJawaz) {
            if (!"rechargejawaz".equalsIgnoreCase(dto.getTypeDepense())) {
                throw new IllegalArgumentException("Impossible de changer le type d'une dépense existante.");
            }
        }
        return depenseRepository.save(depense);
    }
  
    private DepenseDto convertToDto(Depense depense) {
        DepenseDto dto = new DepenseDto();
        dto.setId(depense.getId());
        dto.setDate(depense.getDate());
        dto.setMontant(depense.getMontant());
        dto.setJustificatifUrl(depense.getJustificatifUrl());
        dto.setTypeDepense(depense.getClass().getSimpleName());

        if (depense.getVehicule() != null) {
            dto.setVehiculeId(depense.getVehicule().getId());
            dto.setVehiculeImmatriculation(depense.getVehicule().getImmatriculation());
        }
        if (depense.getMoyenPaiementUtilise() != null) {
            dto.setMoyenPaiementId(depense.getMoyenPaiementUtilise().getId());
            dto.setMoyenPaiementNumero(depense.getMoyenPaiementUtilise().getNumero());
        }

        if (depense instanceof Maintenance maintenance) {
            dto.setTypeIntervention(maintenance.getTypeIntervention());
            dto.setNomGarage(maintenance.getNomGarage());
            dto.setDescription(maintenance.getDescription());
        } else if (depense instanceof PleinCarburant plein) {
            dto.setLitres(plein.getLitres());
            dto.setKilometrage(plein.getKilometrage());
        }
        
        return dto;
    }
}