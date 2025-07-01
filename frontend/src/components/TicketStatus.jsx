import { Badge } from "@/components/ui/badge";
import React from "react";

export default function TicketStatus({ status }) {
  const statusColors = {
    SOUMISE: "bg-blue-500",
    EN_COURS_DE_VALIDATION: "bg-indigo-500",
    APPROUVEE: "bg-green-500",
    REJETEE: "bg-red-500",
    EN_COURS_DE_TRAITEMENT: "bg-yellow-500",
    PRETE_A_ETRE_LIVREE: "bg-cyan-500",
    LIVREE: "bg-emerald-500",
    CLOTUREE: "bg-gray-700",
    ANNULEE: "bg-rose-500",
  };

  return (
    <div
      className={
        `${statusColors[status]} ` +
        " text-white rounded px-2 py-1 text-sm text-center font-semibold w-fit"
      }
    >
      <span>{status.replace(/_/g, " ")}</span>
    </div>
  );
}
