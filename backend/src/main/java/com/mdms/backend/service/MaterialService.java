package com.mdms.backend.service;

import com.mdms.backend.entity.Material;
import com.mdms.backend.respository.MaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MaterialService {
    @Autowired
    private MaterialRepository materialRepository;

    public void saveMaterial(Material material) {
        materialRepository.save(material);
    }

    public void deleteMaterial(Material material) {
        materialRepository.delete(material);
    }

    public Material getMaterialById(Long id) {
        return materialRepository.findById(id).orElseThrow(()-> new RuntimeException("Material not found with id : " + id));
    }

    public Material getMaterialByName(String name) {
        if (!materialRepository.existsByMatName(name)) {
            throw new RuntimeException("Material not found with name : " + name);
        }
        return materialRepository.findByMatName(name);
    }
}
