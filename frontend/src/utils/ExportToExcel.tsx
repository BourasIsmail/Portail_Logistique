import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  BonCommande,
  Marche,
  Contrat,
  AppelOffre,
} from "@/gestion_marche/types";
import { toast } from "sonner";

const MarchesToExcel = (marches: Marche[]) => {
  const rows = [];

  marches.forEach((marche) => {
    if (marche.situationMarches && marche.situationMarches.length > 0) {
      marche.situationMarches.forEach((situation, index) => {
        rows.push({
          Référence: marche.referenceMarche,
          "Référence de l'appel d'offre": marche.appelOffre?.reference || "-",
          Rubrique: marche.rubrique?.rubrique || "-",
          "Année budgétaire": marche.anneeBudgetaire,
          "Objet du marché": marche.objet,
          "Numéro de compte": marche.numCompte,
          Attributaire: marche.attributaire,
          "Montant du marché": `${marche.montantMarche.toLocaleString()} DH`,
          "Type de budget": marche.typeBudget?.name || "-",
          "Date d'approbation": marche.dateApprobation,
          "Date de visa": marche.dateVisa,
          "Date de notification d'approbation":
            marche.dateNotificationApprobation,
          "Date d'ordre de service": marche.dateOrdreService,
          "Délai d'exécution": marche.delaiExecution,

          // Situation-specific
          "Numéro de situation": index + 1,
          "Numéro de facture": situation.numFacture
            ? situation.numFacture
            : "-",
          "Numéro de décompte": situation.numDecompte
            ? situation.numDecompte
            : "-",
          "Montant de décompte": `${situation.montantDecompte.toLocaleString()} DH`,
          Payé: situation.paye ? "Oui" : "Non",
          Observation: situation.observation ? situation.observation : "-",
          "Date d'enregistrement": situation.dateEnregistrement
            ? situation.dateEnregistrement
            : "-",
          "Date de livraison": situation.dateLivraison
            ? situation.dateLivraison
            : "-",
          "Date de réception provisoire": situation.dateReceptionProvisoire
            ? situation.dateReceptionProvisoire
            : "-",
          "Date de service fait": situation.dateServiceFait
            ? situation.dateServiceFait
            : "-",
          "Date de liquidation": situation.dateLiquidation
            ? situation.dateLiquidation
            : "-",
        });
      });
    } else {
      // Handle Marches with no situation
      rows.push({
        Référence: marche.referenceMarche,
        "Référence de l'appel d'offre": marche.appelOffre?.reference || "-",
        Rubrique: marche.rubrique?.rubrique || "-",
        "Année budgétaire": marche.anneeBudgetaire,
        "Objet du marché": marche.objet,
        "Numéro de compte": marche.numCompte,
        Attributaire: marche.attributaire,
        "Montant du marché": `${marche.montantMarche.toLocaleString()} DH`,
        "Type de budget": marche.typeBudget?.name || "-",
        "Date d'approbation": marche.dateApprobation,
        "Date de visa": marche.dateVisa,
        "Date de notification d'approbation":
          marche.dateNotificationApprobation,
        "Date d'ordre de service": marche.dateOrdreService,
        "Délai d'exécution": marche.delaiExecution,
        // All situation fields empty
        "Numéro de situation": "-",
        "Numéro de facture": "-",
        "Numéro de décompte": "-",
        "Montant de décompte": "-",
        Payé: "-",
        Observation: "-",
        "Date d'enregistrement": "-",
        "Date de livraison": "-",
        "Date de réception provisoire": "-",
        "Date de service fait": "-",
        "Date de liquidation": "-",
      });
    }
  });

  return rows;
};

const BonCommandesToExcel = (bons: BonCommande[]) => {
  const rows = [];

  bons.forEach((bon) => {
    if (bon.situationBCs && bon.situationBCs.length > 0) {
      bon.situationBCs.forEach((situation, index) => {
        rows.push({
          "Numéro BC": bon.numBC,
          "Année budgétaire": bon.anneeBudgetaire,
          "Numéro de compte": bon.numCompte,
          "Date BC": bon.dateBC,
          Attributaire: bon.attributaire,
          "Montant BC": `${bon.montant.toLocaleString()} DH`,
          "Date de notification BC": bon.dateNotificationBC,
          "Délai d'exécution": bon.delaiExecution,
          Rubrique: bon.rubrique?.rubrique || "-",
          "Numéro PMN": bon.pmn?.num || "-",
          "Objet PMN": bon.pmn?.objet || "-",

          // SituationBC-specific fields
          "Numéro de situation": index + 1,
          "Numéro de facture": situation.numFacture || "-",
          "Montant de facture": `${situation.montantFacture.toLocaleString()} DH`,
          Payé: situation.paye ? "Oui" : "Non",
          Observation: situation.observation || "-",
          "Date d'enregistrement": situation.dateEnregistrement || "-",
          "Date de livraison": situation.dateLivraison || "-",
          "Date de réception provisoire":
            situation.dateReceptionProvisoire || "-",
          "Date de service fait": situation.dateServiceFait || "-",
          "Date de liquidation": situation.dateLiquidation || "-",
        });
      });
    } else {
      // No situationBCs
      rows.push({
        "Numéro BC": bon.numBC,
        "Année budgétaire": bon.anneeBudgetaire,
        "Numéro de compte": bon.numCompte,
        "Date BC": bon.dateBC,
        Attributaire: bon.attributaire,
        "Montant BC": `${bon.montant.toLocaleString()} DH`,
        "Date de notification BC": bon.dateNotificationBC,
        "Délai d'exécution": bon.delaiExecution,
        Rubrique: bon.rubrique?.rubrique || "-",
        "Numéro PMN": bon.pmn?.num || "-",
        "Objet PMN": bon.pmn?.objet || "-",

        // Empty situation fields
        "Numéro de situation": "-",
        "Numéro de facture": "-",
        "Montant de facture": "-",
        Payé: "-",
        Observation: "-",
        "Date d'enregistrement": "-",
        "Date de livraison": "-",
        "Date de réception provisoire": "-",
        "Date de service fait": "-",
        "Date de liquidation": "-",
      });
    }
  });

  return rows;
};

const ContratsToExcel = (contrats: Contrat[]) => {
  const rows = contrats.map((contrat) => ({
    Référence: contrat.reference,
    "Année budgétaire": contrat.anneeBudgetaire,
    Objet: contrat.objet,
    Attributaire: contrat.attributaire,
    "Numéro de compte": contrat.numCompte || "-",
    Rubrique: contrat.rubrique?.rubrique || "-",
    "Montant du contrat": `${contrat.montant.toLocaleString()} DH`,
    "Type de budget": contrat.typeBudget?.name || "-",
    Description: contrat.description || "-",
    Statut: contrat.statut || "-",
    "Date de signature": contrat.dateSignature || "-",
    "Date de début": contrat.dateDebut || "-",
    "Date de fin": contrat.dateFin || "-",
  }));

  return rows;
};

const AppelsOffresToExcelRowsWithMarches = (appelsOffres: AppelOffre[]) => {
  const rows = [];

  appelsOffres.forEach((ao) => {
    const baseAO = {
      "Référence de l'appel d'offre": ao.reference,
      "Type d'appel d'offre": ao.typeAO?.name || "-",
      "Année budgétaire": ao.anneeBudgetaire,
      Estimation: `${ao.estimation.toLocaleString()} DH`,
      "Objet de l'appel d'offre": ao.objet,
      Rubrique: ao.rubrique?.rubrique || "-",
      "Date de publication": ao.datePublication || "-",
      "Date d'ouverture": ao.dateOuverture || "-",
      "Date de fin des travaux": ao.dateFinTravaux || "-",
      "Date de notification d'approbation":
        ao.dateNotificationApprobation || "-",
    };

    if (!ao.marches || ao.marches.length === 0) {
      rows.push({
        ...baseAO,
        "Référence du marché": "-",
        "Attributaire du marché": "-",
        "Montant du marché": "-",
        "Compte du marché": "-",
      });
    } else {
      ao.marches.forEach((marche, index) => {
        rows.push({
          ...baseAO,
          "N° du marché": index + 1,
          "Référence du marché": marche.referenceMarche,
          "Attributaire du marché": marche.attributaire,
          "Montant du marché": `${marche.montantMarche.toLocaleString()} DH`,
          "Compte du marché": marche.numCompte || "-",
        });
      });
    }
  });

  return rows;
};

export const exportToExcel = (data) => {
  let worksheetData = [];
  let title = "test";

  if (!data || data.length === 0) {
    toast.error("Aucune donnée à exporter.");
    return;
  }

  if ("montantMarche" in data[0]) {
    worksheetData = MarchesToExcel(data);
    title = "Marchés";
  } else if ("numBC" in data[0]) {
    worksheetData = BonCommandesToExcel(data);
    title = "Bons de Commande";
  } else if ("estimation" in data[0]) {
    worksheetData = AppelsOffresToExcelRowsWithMarches(data);
    title = "Appels d'Offres";
  } else if ("statut" in data[0]) {
    worksheetData = ContratsToExcel(data);
    title = "Contrats";
  } else {
    toast.error("Format de données non supporté pour l'exportation.");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, title);

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  console.log(worksheetData);
  saveAs(blob, `${title}.xlsx`);
};
