package com.mdms.backend.entity;

public enum TicketStatus {
    SOUMISE,
    EN_COURS_DE_VALIDATION,
    APPROUVEE,
    REJETEE,
    EN_COURS_DE_TRAITEMENT,
    PRETE_A_ETRE_LIVREE,
    LIVREE,
    CLOTUREE,
    ANNULEE
}

//const statusColors = {
//SOUMISE: "blue-500",
//EN_COURS_DE_VALIDATION: "indigo-500",
//APPROUVEE: "green-500",
//REJETEE: "red-500",
//EN_COURS_DE_TRAITEMENT: "yellow-500",
//PRETE_A_ETRE_LIVREE: "cyan-500",
//LIVREE: "emerald-500",
//CLOTUREE: "gray-700",
//ANNULEE: "rose-500"
//}