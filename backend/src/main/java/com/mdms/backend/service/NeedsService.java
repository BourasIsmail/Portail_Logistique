package com.mdms.backend.service;

import com.mdms.backend.respository.NeedsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NeedsService {
    @Autowired
    private NeedsRepository needsRepository;
}
