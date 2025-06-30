import { Badge } from "@/components/ui/badge";
import React from "react";

export default function TicketStatus({ status }) {
  const statusColors = {
    SOUMISE: "blue-500",
    EN_COURS_DE_VALIDATION: "indigo-500",
    APPROUVEE: "green-500",
    REJETEE: "red-500",
    EN_COURS_DE_TRAITEMENT: "yellow-500",
    PRETE_A_ETRE_LIVREE: "cyan-500",
    LIVREE: "emerald-500",
    CLOTUREE: "gray-700",
    ANNULEE: "rose-500",
  };

  return (
    <div
      className={
        `bg-${statusColors[status]}` +
        " text-white rounded px-2 py-1 text-center text-xs font-semibold"
      }
    >
      <span>{status.replace(/_/g, " ").toLowerCase()}</span>
    </div>
  );
}
