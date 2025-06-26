package com.mdms.backend.service;

import com.mdms.backend.entity.CategoryMat;
import com.mdms.backend.respository.CategoryMatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryMatService {

    @Autowired
    private CategoryMatRepository categoryMatRepository;

    public void saveCategory(CategoryMat category) {
        categoryMatRepository.save(category);
    }

    public void deleteCategory(CategoryMat category) {
        categoryMatRepository.delete(category);
    }

    public CategoryMat getCategoryById(Long id) {
        return categoryMatRepository.findByCtgrId(id).orElseThrow(()-> new RuntimeException("Gategory not found with id : " + id));
    }
}
