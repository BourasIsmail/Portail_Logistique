package com.mdms.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id")
    private Long ticketId;

    @Column(name = "ticket_description")
    private String ticketDescription;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(name = "ticket_status")
    private TicketStatus ticketStatus;

    @CreationTimestamp
    @Column(name = "created_date", updatable = false)
    private Date CreatedDate;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    @JsonIgnoreProperties({"tickets", "password", "role", "enabled"})
    private User user;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "ctgr_id", referencedColumnName = "ctgr_id")
    @JsonIgnoreProperties({"materials"})
    private CategoryMat categoryMat;

    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"ticket"})
    private List<Needs> needs = new ArrayList<>();

    @Column(name = "observation")
    private String observation;

    @Column(name = "note")
    private String note = "";

    @Column(name = "is_archived")
    private boolean isArchived = false;

    public Ticket(String ticketDescription, User user, CategoryMat categoryMat, List<Needs> needs) {
        this.ticketDescription = ticketDescription;
        this.user = user;
        this.categoryMat = categoryMat;
        this.needs = needs;
    }
}
