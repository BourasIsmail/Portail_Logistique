import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftCircleIcon, FileText, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/navbar";
import { useNavigate } from "react-router-dom";
import { Marche } from "@/gestion_marche/types";

interface DetailViewProps {
  type: "marche" | "bc" | "contrat" | "appelOffre";
  data: any;
  backUrl: string;
  onEdit: () => void;
}

export default function DetailView({
  type,
  data,
  backUrl,
  onEdit,
}: DetailViewProps) {
  const navigate = useNavigate();
  const formatDate = (dateString: string | Date) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("fr-FR");
  };

  const formatMoney = (amount: number) => {
    if (!amount && amount !== 0) return "-";
    return `${amount.toLocaleString("fr-FR")} DH`;
  };

  const getTitle = () => {
    switch (type) {
      case "marche":
        return `Marché: ${data.referenceMarche}`;
      case "bc":
        return `Bon de commande: ${data.numBC}`;
      case "contrat":
        return `Contrat: ${data.reference}`;
      case "appelOffre":
        return `Appel d'offre: ${data.reference}`;
    }
  };

  const getDescription = () => {
    switch (type) {
      case "marche":
        return "Les détails ci-dessous présentent toutes les informations relatives à ce marché, y compris ses caractéristiques principales et les situations associées.";
      case "bc":
        return "Les détails ci-dessous présentent toutes les informations relatives à ce bon de commande, y compris ses caractéristiques principales et les situations associées.";
      case "contrat":
        return "Les détails ci-dessous présentent toutes les informations relatives à ce contrat, y compris ses dates d'effet et d'échéance.";
      case "appelOffre":
        return "Les détails ci-dessous présentent toutes les informations relatives à cet appel d'offre, y compris ses caractéristiques principales et les situations associées.";
    }
  };

  const renderMarcheDetails = () => (
    <>
      {/* Informations générales */}
      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm pt-0">
        <CardHeader className="border rounded-t-xl py-4 border-slate-200/80 bg-slate-50/80 ">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <Info className="h-5 w-5" />
            Détails du marché
          </CardTitle>
        </CardHeader>
        <CardContent className={undefined}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-slate-500">Référence</h3>
              <p className="mt-1 text-base text-slate-900">
                {data.referenceMarche || "-"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Appel d'offre
              </h3>
              <p className="mt-1 text-base text-slate-900">
                {data.appelOffre?.reference || "-"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Année budgétaire
              </h3>
              <p className="mt-1 text-base text-slate-900">
                {data.anneeBudgetaire || "-"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Numéro de compte
              </h3>
              <p className="mt-1 text-base text-slate-900">
                {data.numCompte || "-"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">Rubrique</h3>
              <p className="mt-1 text-base text-slate-900">
                {data.rubrique.rubrique || "-"}
              </p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-slate-500">Objet</h3>
              <p className="mt-1 text-base text-slate-900">
                {data.objet || "-"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Attributaire
              </h3>
              <p className="mt-1 text-base text-slate-900">
                {data.attributaire || "-"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Montant du marché
              </h3>
              <p className="mt-1 text-base font-semibold text-slate-900">
                {formatMoney(data.montantMarche)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Date d&apos;approbation
              </h3>
              <p className="mt-1 text-base text-slate-900">
                {formatDate(data.dateApprobation)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Date de visa
              </h3>
              <p className="mt-1 text-base text-slate-900">
                {formatDate(data.dateVisa)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Date notification d&apos;approbation
              </h3>
              <p className="mt-1 text-base text-slate-900">
                {formatDate(data.dateNotificationApprobation)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Date de l&apos;ordre de service
              </h3>
              <p className="mt-1 text-base text-slate-900">
                {formatDate(data.dateOrdreService)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Délai d&apos;exécution
              </h3>
              <p className="mt-1 text-base text-slate-900">
                {data.delaiExecution || "-"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Séparateur */}
      <Separator className="my-8 bg-slate-200/80" />

      {/* Situations du marché */}
      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm pt-0">
        <CardHeader className="border rounded-t-xl py-4 border-slate-200/80 bg-slate-50/80 ">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <FileText className="h-5 w-5" />
            Situations du marché
          </CardTitle>
        </CardHeader>
        <CardContent className={undefined}>
          {!data.situationMarches || data.situationMarches.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-500">
              Aucune situation n&apos;est associée à ce marché.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className={undefined}>
                <TableHeader className="bg-slate-50/80">
                  <TableRow className={undefined}>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                      N°
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                      Date livraison
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                      Date réception
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                      N° Facture
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                      Montant décompte
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                      Statut
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-slate-200/80">
                  {data.situationMarches.map(
                    (
                      situation: {
                        id: string | number;
                        dateLivraison: string;
                        dateReceptionProvisoire: string;
                        numFacture?: string;
                        montantDecompte: number;
                        paye: boolean;
                      },
                      index: number
                    ) => (
                      <TableRow
                        key={situation.id}
                        className="hover:bg-slate-50/50"
                      >
                        <TableCell className="px-6 py-4 font-medium text-slate-800">
                          {index + 1}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-slate-600">
                          {formatDate(situation.dateLivraison?.toString())}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-slate-600">
                          {formatDate(
                            situation.dateReceptionProvisoire?.toString()
                          )}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-slate-600">
                          {situation.numFacture || "-"}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-slate-600">
                          {formatMoney(situation.montantDecompte)}
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <Badge
                            variant={undefined}
                            className={
                              situation.paye
                                ? "border-transparent bg-green-100 text-green-800 hover:bg-green-200/80"
                                : "border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200/80"
                            }
                          >
                            {situation.paye ? "Payé" : "Non payé"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );

  const renderBCDetails = () => (
    <>
      {/* Informations générales */}
      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm pt-0">
        <CardHeader className="border rounded-t-xl py-4 border-slate-200/80 bg-slate-50/80 ">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <Info className="h-5 w-5" />
            Détails du bon de commande
          </CardTitle>
        </CardHeader>
        <CardContent className={undefined}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-slate-500">Numéro BC</h3>
              <p className="mt-1 text-base text-slate-900">
                {data.numBC || "-"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">Date BC</h3>
              <p className="mt-1 text-base text-slate-900">
                {formatDate(data.dateBC)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Année budgétaire
              </h3>
              <p className="mt-1 text-base text-slate-900">
                {data.anneeBudgetaire || "-"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Numéro de compte
              </h3>
              <p className="mt-1 text-base text-slate-900">
                {data.numCompte || "-"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">Rubrique</h3>
              <p className="mt-1 text-base text-slate-900">
                {data.rubrique?.rubrique || "-"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">Numéro PMN</h3>
              <p className="mt-1 text-base text-slate-900">
                {data.pmn?.num || "-"}
              </p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-slate-500">Objet PMN</h3>
              <p className="mt-1 text-base text-slate-900">
                {data.pmn?.objet || "-"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Attributaire
              </h3>
              <p className="mt-1 text-base text-slate-900">
                {data.attributaire || "-"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">Montant</h3>
              <p className="mt-1 text-base font-semibold text-slate-900">
                {formatMoney(data.montant)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Date de notification BC
              </h3>
              <p className="mt-1 text-base text-slate-900">
                {formatDate(data.dateNotificationBC)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500">
                Délai d&apos;exécution
              </h3>
              <p className="mt-1 text-base text-slate-900">
                {data.delaiExecution || "-"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Séparateur */}
      <Separator className="my-8 bg-slate-200/80" />

      {/* Situations du BC */}
      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm pt-0">
        <CardHeader className="border rounded-t-xl py-4 border-slate-200/80 bg-slate-50/80 ">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
            <FileText className="h-5 w-5" />
            Situations du bon de commande
          </CardTitle>
        </CardHeader>
        <CardContent className={undefined}>
          {!data.situationBCs || data.situationBCs.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-500">
              Aucune situation n&apos;est associée à ce bon de commande.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className={undefined}>
                <TableHeader className="bg-slate-50/80">
                  <TableRow className={undefined}>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                      N°
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                      Date livraison
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                      Date réception
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                      N° Facture
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                      Montant facture
                    </TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                      Statut
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-slate-200/80">
                  {data.situationBCs.map(
                    (
                      situation: {
                        id: string | number;
                        dateLivraison: string | Date;
                        dateReceptionProvisoire: string | Date;
                        numFacture?: string;
                        montantFacture: number;
                        paye: boolean;
                      },
                      index: number
                    ) => (
                      <TableRow
                        key={situation.id}
                        className="hover:bg-slate-50/50"
                      >
                        <TableCell className="px-6 py-4 font-medium text-slate-800">
                          {index + 1}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-slate-600">
                          {formatDate(situation.dateLivraison)}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-slate-600">
                          {formatDate(situation.dateReceptionProvisoire)}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-slate-600">
                          {situation.numFacture || "-"}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-slate-600">
                          {formatMoney(situation.montantFacture)}
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <Badge
                            variant={undefined}
                            className={
                              situation.paye
                                ? "border-transparent bg-green-100 text-green-800 hover:bg-green-200/80"
                                : "border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200/80"
                            }
                          >
                            {situation.paye ? "Payé" : "Non payé"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );

  const renderContratDetails = () => (
    <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm pt-0">
      <CardHeader className="border rounded-t-xl py-4 border-slate-200/80 bg-slate-50/80 ">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
          <Info className="h-5 w-5" />
          Détails du contrat
        </CardTitle>
      </CardHeader>
      <CardContent className={undefined}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-slate-500">Référence</h3>
            <p className="mt-1 text-base text-slate-900">
              {data.reference || "-"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">Rubrique</h3>
            <p className="mt-1 text-base text-slate-900">
              {data.rubrique.rubrique || "-"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">
              Année budgétaire
            </h3>
            <p className="mt-1 text-base text-slate-900">
              {data.anneeBudgetaire || "-"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">Objet</h3>
            <p className="mt-1 text-base text-slate-900">{data.objet || "-"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">Attributaire</h3>
            <p className="mt-1 text-base text-slate-900">
              {data.attributaire || "-"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">Montant</h3>
            <p className="mt-1 text-base font-semibold text-slate-900">
              {formatMoney(data.montant)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">
              Type de budget
            </h3>
            <p className="mt-1 text-base text-slate-900">
              {data.typeBudget.name || "-"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">
              Date de signature
            </h3>
            <p className="mt-1 text-base text-slate-900">
              {formatDate(data.dateSignature)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">
              Date de début
            </h3>
            <p className="mt-1 text-base text-slate-900">
              {formatDate(data.dateDebut)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">Date de fin</h3>
            <p className="mt-1 text-base text-slate-900">
              {formatDate(data.dateFin)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">Statut</h3>
            <Badge
              className={
                data.statut === "En cours"
                  ? "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200/80"
                  : data.statut === "Terminé"
                  ? "border-transparent bg-green-100 text-green-800 hover:bg-green-200/80"
                  : data.statut === "Suspendu"
                  ? "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200/80"
                  : "border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200/80"
              }
              variant={"default"}
            >
              {data.statut || "-"}
            </Badge>
          </div>
          {data.description && (
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-slate-500">
                Description
              </h3>
              <p className="mt-1 text-base text-slate-900">
                {data.description}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderAppelOffreDetails = () => (
    <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm pt-0">
      <CardHeader className="border rounded-t-xl py-4 border-slate-200/80 bg-slate-50/80 ">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-800">
          <Info className="h-5 w-5" />
          Détails de l'appel d'offre
        </CardTitle>
      </CardHeader>
      <CardContent className={undefined}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-slate-500">Référence</h3>
            <p className="mt-1 text-base text-slate-900">
              {data.reference || "-"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">
              Année budgétaire
            </h3>
            <p className="mt-1 text-base text-slate-900">
              {data.anneeBudgetaire || "-"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">
              Type d'appel d'offre
            </h3>
            <p className="mt-1 text-base text-slate-900">
              {data.typeAO.name || "-"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">Rubrique</h3>
            <p className="mt-1 text-base text-slate-900">
              {data.rubrique.rubrique || "-"}
            </p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-slate-500">Objet</h3>
            <p className="mt-1 text-base text-slate-900">{data.objet || "-"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">
              Date de publication
            </h3>
            <p className="mt-1 text-base text-slate-900">
              {formatDate(data.datePublication)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">
              Date limite de soumission
            </h3>
            <p className="mt-1 text-base text-slate-900">
              {formatDate(data.dateLimite)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-500">Statut</h3>
            <Badge
              className={
                data.statut === "Ouvert"
                  ? "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200/80"
                  : data.statut === "Fermé"
                  ? "border-transparent bg-green-100 text-green-800 hover:bg-green-200/80"
                  : "border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200/80"
              }
              variant={"default"}
            >
              {data.statut || "-"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (type) {
      case "marche":
        return renderMarcheDetails();
      case "bc":
        return renderBCDetails();
      case "contrat":
        return renderContratDetails();
      case "appelOffre":
        return renderAppelOffreDetails();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-50 ">
        <Navbar />
        <main className="container mx-auto max-w-5xl px-4 py-8">
          <button
            className="flex items-center w-fit gap-2 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-200 hover:bg-slate-100"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftCircleIcon className="h-4 w-4" />
            <span>Retour</span>
          </button>

          <header className="mb-8 mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {getTitle()}
            </h1>
            <p className="mt-2 text-base text-slate-500">{getDescription()}</p>
          </header>

          {renderContent()}
        </main>
      </div>
    </div>
  );
}
