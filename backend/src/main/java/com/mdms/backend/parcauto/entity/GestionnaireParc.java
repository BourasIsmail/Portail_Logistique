package com.mdms.backend.parcauto.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import com.mdms.backend.entity.User;

@Entity
@Table(name = "gestionnaires_parc")
public class GestionnaireParc extends User {}
