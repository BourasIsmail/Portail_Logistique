import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package,
  Truck,
  FileCheck,
  Archive,
  Ban,
} from "lucide-react";

export default function TicketStatus({ status, showIcon = true, size = "sm" }) {
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

  const statusConfig = {
    SOUMISE: {
      label: "SOUMISE",
      bgColor: statusColors.SOUMISE,
      textColor: "text-white",
      icon: FileCheck,
      description: "Demande soumise",
    },
    EN_COURS_DE_VALIDATION: {
      label: "EN COURS DE VALIDATION",
      bgColor: statusColors.EN_COURS_DE_VALIDATION,
      textColor: "text-white",
      icon: AlertCircle,
      description: "En cours de validation",
    },
    APPROUVEE: {
      label: "APPROUVÉE",
      bgColor: statusColors.APPROUVEE,
      textColor: "text-white",
      icon: CheckCircle,
      description: "Demande approuvée",
    },
    REJETEE: {
      label: "REJETÉE",
      bgColor: statusColors.REJETEE,
      textColor: "text-white",
      icon: XCircle,
      description: "Demande rejetée",
    },
    EN_COURS_DE_TRAITEMENT: {
      label: "EN COURS DE TRAITEMENT",
      bgColor: statusColors.EN_COURS_DE_TRAITEMENT,
      textColor: "text-white",
      icon: Clock,
      description: "En cours de traitement",
    },
    PRETE_A_ETRE_LIVREE: {
      label: "PRÊTE À ÊTRE LIVRÉE",
      bgColor: statusColors.PRETE_A_ETRE_LIVREE,
      textColor: "text-white",
      icon: Package,
      description: "Prête à être livrée",
    },
    LIVREE: {
      label: "LIVRÉE",
      bgColor: statusColors.LIVREE,
      textColor: "text-white",
      icon: Truck,
      description: "Demande livrée",
    },
    CLOTUREE: {
      label: "CLÔTURÉE",
      bgColor: statusColors.CLOTUREE,
      textColor: "text-white",
      icon: Archive,
      description: "Demande clôturée",
    },
    ANNULEE: {
      label: "ANNULÉE",
      bgColor: statusColors.ANNULEE,
      textColor: "text-white",
      icon: Ban,
      description: "Demande annulée",
    },
  };

  const config = statusConfig[status] || statusConfig.SOUMISE;
  const IconComponent = config.icon;

  // Size variants
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    default: "text-sm px-2.5 py-1.5",
    lg: "text-base px-3 py-2",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    default: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <Badge
      className={`
        ${config.bgColor} 
        ${config.textColor} 
        border-0
        hover:opacity-80
        transition-all 
        duration-200 
        font-medium
        ${sizeClasses[size]}
        ${showIcon ? "flex items-center gap-1.5" : ""}
      `}
      title={config.description}
    >
      {showIcon && (
        <IconComponent
          className={`${iconSizes[size]}`}
          color="white"
          strokeWidth={"3px"}
        />
      )}
      {config.label}
    </Badge>
  );
}

// export default function TicketStatus({ status }) {
//   const statusColors = {
//     SOUMISE: "bg-blue-500",
//     EN_COURS_DE_VALIDATION: "bg-indigo-500",
//     APPROUVEE: "bg-green-500",
//     REJETEE: "bg-red-500",
//     EN_COURS_DE_TRAITEMENT: "bg-yellow-500",
//     PRETE_A_ETRE_LIVREE: "bg-cyan-500",
//     LIVREE: "bg-emerald-500",
//     CLOTUREE: "bg-gray-700",
//     ANNULEE: "bg-rose-500",
//   };

//   return (
//     <div
//       className={
//         `${statusColors[status]} ` +
//         " text-white rounded px-2 py-1 text-sm text-center font-semibold w-fit"
//       }
//     >
//       <span>{status.replace(/_/g, " ")}</span>
//     </div>
//   );
// }
