package com.mdms.backend.service;

import com.mdms.backend.entity.*;
import com.mdms.backend.request.NeedsDto;
import com.mdms.backend.request.TicketRequest;
import com.mdms.backend.respository.MaterialRepository;
import com.mdms.backend.respository.TicketRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private MaterialRepository materialRepository;


    public Ticket addTicket(TicketRequest request, User user, CategoryMat category) {
        Ticket ticket = new Ticket();

        List<Needs> needs = new ArrayList<>();

        for(NeedsDto needsDto : request.getNeeds()){
            Needs need = new Needs();

            Material material = materialRepository.findById(needsDto.getMaterialId())
                    .orElseThrow(()-> new RuntimeException("Material not found with id : " + needsDto.getMaterialId()));

            need.setMaterial(material);
            need.setQuantity(needsDto.getQuantity());
            need.setTicket(ticket);
            need.setAffectationParBureau(needsDto.getAffectationParBureau());
            need.setAffectationParPersonne(needsDto.getAffectationParPersonne());
            need.setObservation(needsDto.getObservation());

            needs.add(need);
        }

        ticket.setTicketDescription(request.getTicketDesc());
        ticket.setCategoryMat(category);
        ticket.setUser(user);
        ticket.setTicketStatus(TicketStatus.EN_COURS_DE_TRAITEMENT);
        ticket.setNeeds(needs);

        return ticketRepository.save(ticket);
    }

    public List<Ticket> getTickets() {
        return ticketRepository.findAll();
    }


}
