import type React from "react";
// Types communs pour l'application
export interface Marche {
  id: number;
  anneeBudgetaire: string;
  numCompte: string;
  rubrique: string;
  referenceMarche: string;
  objet: string;
  attributaire: string;
  montantMarche: number;
  dateApprobation: string;
  dateVisa: string;
  dateNotificationApprobation: string;
  dateOrdreService: string;
  delaiExecution: string;
  typeBudgetId?: string;
  situationMarches: SituationMarche[];
}

export interface SituationMarche {
  id: number;
  dateLivraison: string;
  dateReceptionProvisoire: string;
  numFacture: string;
  dateEnregistrement: string;
  numDecompte: string;
  dateServiceFait: string;
  dateLiquidation: string;
  montantDecompte: number;
  paye: boolean;
  observation: string;
}

export interface BonCommande {
  id: number;
  anneeBudgetaire: string;
  numCompte: string;
  rubrique: string;
  pmnNum: string;
  pmnObjet: string;
  numBC: string;
  dateBC: string;
  attributaire: string;
  montant: number;
  dateNotificationBC: string;
  delaiExecution: string;
  pmnId?: string;
  situationBCs: SituationBC[];
}

export interface SituationBC {
  id: number;
  dateLivraison: string;
  dateReceptionProvisoire: string;
  numFacture: string;
  dateEnregistrement: string;
  dateServiceFait: string;
  dateLiquidation: string;
  montantFacture: number;
  paye: boolean;
  observation: string;
}

export interface Contrat {
  id: number;
  reference: string;
  anneeBudgetaire: string;
  objet: string;
  attributaire: string;
  montant: number;
  dateSignature: string;
  dateDebut: string;
  dateFin: string;
  statut: string;
  description?: string;
  typeBudgetId?: string;
  rubriqueId?: string;
  numCompte?: string;
  rubrique?: string;
}

export interface TypeBudget {
  id: number;
  nom: string;
}

export interface Rubrique {
  id: number;
  nCompte: string;
  rubrique: string;
}

export interface PMN {
  id: number;
  num: string;
  objet: string;
  montant: number;
}

export interface DashboardStats {
  totalMarches: number;
  totalBC: number;
  totalContrats: number;
  montantTotalMarches: number;
  montantTotalBC: number;
  montantTotalContrats: number;
  marchesPaye: number;
  marchesEnCours: number;
  bcPaye: number;
  bcEnCours: number;
  contratActifs: number;
  contratExpires: number;
}

export interface Column<T> {
  key: string;
  header: string | React.ReactNode;
  render?: (item: T) => React.ReactNode;
}
