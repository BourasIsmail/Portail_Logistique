package com.mdms.backend.parcauto.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import com.mdms.backend.entity.User;

@Entity
@Table(name = "admins_parc")
public class AdminParc extends User {}
