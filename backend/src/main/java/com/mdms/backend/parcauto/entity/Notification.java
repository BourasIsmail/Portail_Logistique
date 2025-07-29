package com.mdms.backend.parcauto.entity;

import com.mdms.backend.entity.User;
import com.mdms.backend.parcauto.enums.StatutNotification;
import com.mdms.backend.parcauto.enums.TypeNotification;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;


@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String message;

    private TypeNotification type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutNotification statut = StatutNotification.NON_LUE;

    @Column(nullable = false)
    private LocalDateTime dateCreation = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id",nullable = false)

    private User destinataire;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="vehicule_id")

    private Vehicule vehicule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="maintenance_id")

    private Maintenance maintenance;

}
