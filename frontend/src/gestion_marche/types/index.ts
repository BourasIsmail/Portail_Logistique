import type React from "react";
// Types communs pour l'application

export interface AppelOffre {
  id: number;
  anneeBudgetaire: string;
  reference: string;
  objet: string;
  estimation: number;

  datePublication: string;
  dateOuverture: string;
  dateFinTravaux: string;
  dateNotificationApprobation: string;

  rubrique?: Rubrique;
  rubriqueId?: number;
  typeAO?: TypeAO;
  typeAOId?: number;

  marches?: Marche[];
}

export interface Marche {
  id: number;
  anneeBudgetaire: string; //done
  numCompte: string; //done
  referenceMarche: string; //done
  objet: string; //done
  attributaire: string; //done
  montantMarche: number; //done
  dateApprobation: string; //done
  dateVisa: string; //done
  dateNotificationApprobation: string; //done
  dateOrdreService: string; //done
  delaiExecution: string; //done
  typeBudgetId?: number; //done
  typeBudget?: TypeBudget; //done
  rubriqueId?: number; //done
  rubrique?: Rubrique; //done
  appelOffreId?: number; //done
  appelOffre?: AppelOffre; //done
  situationMarches: SituationMarche[];
}

export interface SituationMarche {
  id: number;
  dateLivraison: string; //done
  dateReceptionProvisoire: string; //done
  numFacture: string; //done
  dateEnregistrement: string; //done
  numDecompte: string; //done
  dateServiceFait: string; //done
  dateLiquidation: string; //done
  montantDecompte: number; //done
  paye: boolean; //done
  observation: string; //done
}

export interface BonCommande {
  id: number;
  anneeBudgetaire: string;
  numCompte: string;
  numBC: string;
  dateBC: string;
  attributaire: string;
  montant: number;
  dateNotificationBC: string;
  delaiExecution: string;
  rubrique: Rubrique;
  rubriqueId?: number;
  pmnId?: number;
  pmnNum: string;
  pmnObjet: string;
  pmn?: PMN;
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
  typeBudgetId?: number;
  rubriqueId?: number;
  numCompte?: string;
  rubrique?: Rubrique;
  typeBudget?: TypeBudget;
}

export interface TypeBudget {
  id: number;
  name: string;
}

export interface TypeAO {
  id: number;
  name: string;
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
