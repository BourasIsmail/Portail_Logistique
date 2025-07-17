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
      <Card className="border-gray-200 pt-0">
        <CardHeader className="bg-gray-50 border-b pt-6 rounded-t-xl border-gray-200">
          <CardTitle className="text-gray-900">Détails du marché</CardTitle>
        </CardHeader>
        <CardContent className={undefined}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-sm text-gray-500">Référence</h3>
              <p className="text-gray-900">{data.referenceMarche || "-"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Appel d'offre
              </h3>
              <p className="text-gray-900">
                {data.appelOffre?.reference || "-"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Année budgétaire
              </h3>
              <p className="text-gray-900">{data.anneeBudgetaire || "-"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Numéro de compte
              </h3>
              <p className="text-gray-900">{data.numCompte || "-"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">Rubrique</h3>
              <p className="text-gray-900">{data.rubrique.rubrique || "-"}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-semibold text-sm text-gray-500">Objet</h3>
              <p className="text-gray-900">{data.objet || "-"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Attributaire
              </h3>
              <p className="text-gray-900">{data.attributaire || "-"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Montant du marché
              </h3>
              <p className="font-semibold text-gray-900">
                {formatMoney(data.montantMarche)}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Date d&apos;approbation
              </h3>
              <p className="text-gray-900">
                {formatDate(data.dateApprobation)}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Date de visa
              </h3>
              <p className="text-gray-900">{formatDate(data.dateVisa)}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Date notification d&apos;approbation
              </h3>
              <p className="text-gray-900">
                {formatDate(data.dateNotificationApprobation)}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Date de l&apos;ordre de service
              </h3>
              <p className="text-gray-900">
                {formatDate(data.dateOrdreService)}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Délai d&apos;exécution
              </h3>
              <p className="text-gray-900">{data.delaiExecution || "-"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Séparateur */}
      <Separator className="my-6 bg-gray-200" />

      {/* Situations du marché */}
      <Card className="border-gray-200 pt-0">
        <CardHeader className="bg-gray-50 border-b pt-6 rounded-t-xl border-gray-200">
          <CardTitle className="text-gray-900">Situations du marché</CardTitle>
        </CardHeader>
        <CardContent className={undefined}>
          {!data.situationMarches || data.situationMarches.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Aucune situation n&apos;est associée à ce marché.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className={undefined}>
                <TableHeader className="bg-gray-50">
                  <TableRow className={undefined}>
                    <TableHead className="text-gray-700">N°</TableHead>
                    <TableHead className="text-gray-700">
                      Date livraison
                    </TableHead>
                    <TableHead className="text-gray-700">
                      Date réception
                    </TableHead>
                    <TableHead className="text-gray-700">N° Facture</TableHead>
                    <TableHead className="text-gray-700">
                      Montant décompte
                    </TableHead>
                    <TableHead className="text-gray-700">Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className={undefined}>
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
                      <TableRow key={situation.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell className={undefined}>
                          {formatDate(situation.dateLivraison?.toString())}
                        </TableCell>
                        <TableCell className={undefined}>
                          {formatDate(
                            situation.dateReceptionProvisoire?.toString()
                          )}
                        </TableCell>
                        <TableCell className={undefined}>
                          {situation.numFacture || "-"}
                        </TableCell>
                        <TableCell className={undefined}>
                          {formatMoney(situation.montantDecompte)}
                        </TableCell>
                        <TableCell className={undefined}>
                          <Badge
                            variant="secondary"
                            className={
                              situation.paye
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
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
      <Card className="border-gray-200 pt-0">
        <CardHeader className="bg-gray-50 border-b pt-6 rounded-t-xl border-gray-200">
          <CardTitle className="text-gray-900">
            Détails du bon de commande
          </CardTitle>
        </CardHeader>
        <CardContent className={undefined}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-sm text-gray-500">Numéro BC</h3>
              <p className="text-gray-900">{data.numBC || "-"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">Date BC</h3>
              <p className="text-gray-900">{formatDate(data.dateBC)}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Année budgétaire
              </h3>
              <p className="text-gray-900">{data.anneeBudgetaire || "-"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Numéro de compte
              </h3>
              <p className="text-gray-900">{data.numCompte || "-"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">Rubrique</h3>
              <p className="text-gray-900">{data.rubrique?.rubrique || "-"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Numéro PMN
              </h3>
              <p className="text-gray-900">{data.pmn?.num || "-"}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-semibold text-sm text-gray-500">Objet PMN</h3>
              <p className="text-gray-900">{data.pmn?.objet || "-"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Attributaire
              </h3>
              <p className="text-gray-900">{data.attributaire || "-"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">Montant</h3>
              <p className="font-semibold text-gray-900">
                {formatMoney(data.montant)}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Date de notification BC
              </h3>
              <p className="text-gray-900">
                {formatDate(data.dateNotificationBC)}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Délai d&apos;exécution
              </h3>
              <p className="text-gray-900">{data.delaiExecution || "-"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Séparateur */}
      <Separator className="my-6 bg-gray-200" />

      {/* Situations du BC */}
      <Card className="border-gray-200 pt-0">
        <CardHeader className="bg-gray-50 border-b pt-6 rounded-t-xl border-gray-200">
          <CardTitle className="text-gray-900">
            Situations du bon de commande
          </CardTitle>
        </CardHeader>
        <CardContent className={undefined}>
          {!data.situationBCs || data.situationBCs.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Aucune situation n&apos;est associée à ce bon de commande.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className={undefined}>
                <TableHeader className="bg-gray-50">
                  <TableRow className={undefined}>
                    <TableHead className="text-gray-700">N°</TableHead>
                    <TableHead className="text-gray-700">
                      Date livraison
                    </TableHead>
                    <TableHead className="text-gray-700">
                      Date réception
                    </TableHead>
                    <TableHead className="text-gray-700">N° Facture</TableHead>
                    <TableHead className="text-gray-700">
                      Montant facture
                    </TableHead>
                    <TableHead className="text-gray-700">Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className={undefined}>
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
                      <TableRow key={situation.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">
                          {index + 1}
                        </TableCell>
                        <TableCell className={undefined}>
                          {formatDate(situation.dateLivraison)}
                        </TableCell>
                        <TableCell className={undefined}>
                          {formatDate(situation.dateReceptionProvisoire)}
                        </TableCell>
                        <TableCell className={undefined}>
                          {situation.numFacture || "-"}
                        </TableCell>
                        <TableCell className={undefined}>
                          {formatMoney(situation.montantFacture)}
                        </TableCell>
                        <TableCell className={undefined}>
                          <Badge
                            variant={situation.paye ? "default" : "secondary"}
                            className={
                              situation.paye
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
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
    <Card className="border-gray-200 pt-0">
      <CardHeader className="bg-gray-50 border-b pt-6 rounded-t-xl border-gray-200">
        <CardTitle className="text-gray-900">Détails du contrat</CardTitle>
      </CardHeader>
      <CardContent className={undefined}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-sm text-gray-500">Référence</h3>
            <p className="text-gray-900">{data.reference || "-"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-500">Rubrique</h3>
            <p className="text-gray-900">{data.rubrique.rubrique || "-"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-500">
              Année budgétaire
            </h3>
            <p className="text-gray-900">{data.anneeBudgetaire || "-"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-500">Objet</h3>
            <p className="text-gray-900">{data.objet || "-"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-500">
              Attributaire
            </h3>
            <p className="text-gray-900">{data.attributaire || "-"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-500">Montant</h3>
            <p className="font-semibold text-gray-900">
              {formatMoney(data.montant)}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-500">
              Type de budget
            </h3>
            <p className="text-gray-900">{data.typeBudget.name || "-"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-500">
              Date de signature
            </h3>
            <p className="text-gray-900">{formatDate(data.dateSignature)}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-500">
              Date de début
            </h3>
            <p className="text-gray-900">{formatDate(data.dateDebut)}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-500">Date de fin</h3>
            <p className="text-gray-900">{formatDate(data.dateFin)}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-500">Statut</h3>
            <Badge
              className={
                data.statut === "En cours"
                  ? "bg-blue-100 text-blue-800"
                  : data.statut === "Terminé"
                  ? "bg-green-100 text-green-800"
                  : data.statut === "Suspendu"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }
              variant={"default"}
            >
              {data.statut || "-"}
            </Badge>
          </div>
          {data.description && (
            <div className="">
              <h3 className="font-semibold text-sm text-gray-500">
                Description
              </h3>
              <p className="text-gray-900">{data.description}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderAppelOffreDetails = () => (
    <>
      <Card className="border-gray-200 pt-0">
        <CardHeader className="bg-gray-50 border-b pt-6 rounded-t-xl border-gray-200">
          <CardTitle className="text-gray-900">
            Détails de l'appel d'offre
          </CardTitle>
        </CardHeader>
        <CardContent className={undefined}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-sm text-gray-500">Référence</h3>
              <p className="text-gray-900">{data.reference || "-"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">Rubrique</h3>
              <p className="text-gray-900">{data.rubrique.rubrique || "-"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Type d'appel d'offre
              </h3>
              <p className="text-gray-900">{data.typeAO.name || "-"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Année budgétaire
              </h3>
              <p className="text-gray-900">{data.anneeBudgetaire || "-"}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-semibold text-sm text-gray-500">Objet</h3>
              <p className="text-gray-900">{data.objet || "-"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Estimation
              </h3>
              <p className="font-semibold text-gray-900">
                {formatMoney(data.estimation)}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Date de publication dans le portail
              </h3>
              <p className="text-gray-900">
                {formatDate(data.datePublication)}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Date de ouverture des plis
              </h3>
              <p className="text-gray-900">{formatDate(data.dateOuverture)}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Date de fin travaux de la commission
              </h3>
              <p className="text-gray-900">{formatDate(data.dateFinTravaux)}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-500">
                Date de notification de l'approbation
              </h3>
              <p className="text-gray-900">
                {formatDate(data.dateNotificationApprobation)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-6 bg-gray-200" />

      <Card className="border-gray-200 pt-0">
        <CardHeader className="bg-gray-50 border-b pt-6 rounded-t-xl border-gray-200">
          <CardTitle className="text-gray-900">
            Marchés associés à l'appel d'offre
          </CardTitle>
        </CardHeader>
        <CardContent className={undefined}>
          {!data.marches && data.marches.length >= 0 ? (
            <div className="text-center py-4 text-gray-500">
              Aucun marché n&apos;est associé à cet appel d&apos;offre.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className={undefined}>
                <TableHeader className="bg-gray-50">
                  <TableRow className={undefined}>
                    <TableHead className="text-gray-700">N°</TableHead>
                    <TableHead className="text-gray-700">Reference</TableHead>
                    <TableHead className="text-gray-700">Montant</TableHead>
                    <TableHead className="text-gray-700">
                      Attributaire
                    </TableHead>
                    <TableHead className="text-gray-700">
                      Date d'approbation
                    </TableHead>
                    <TableHead className="text-gray-700">
                      Date de visa
                    </TableHead>
                    <TableHead className="text-gray-700">
                      Date d'ordre de service
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className={undefined}>
                  {data.marches.map((marche: Marche, index: number) => (
                    <TableRow
                      key={marche.id}
                      className="hover:bg-gray-50"
                      onClick={() => navigate(`/gm/marches/${marche.id}`)}
                    >
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className={undefined}>
                        {marche.referenceMarche || "-"}
                      </TableCell>
                      <TableCell className={undefined}>
                        {formatMoney(marche.montantMarche)}
                      </TableCell>
                      <TableCell className={undefined}>
                        {marche.attributaire || "-"}
                      </TableCell>
                      <TableCell className={undefined}>
                        {formatDate(marche.dateApprobation)}
                      </TableCell>
                      <TableCell className={undefined}>
                        {formatDate(marche.dateVisa)}
                      </TableCell>
                      <TableCell className={undefined}>
                        {formatDate(marche.dateOrdreService)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Navbar showBackButton />
      <div className="container mx-auto pt-3 pb-6 px-6 space-y-2 ">
        <div className="flex pt-1.5 self-center items-center justify-between px-5">
          <div>
            <button
              className="flex items-center gap-2 rounded-md hover:bg-gray-200 px-1 py-0.5"
              onClick={() => navigate(-1)}
            >
              <ArrowLeftCircleIcon className="w-5 h-5" />
              <span className="text-lg font-bold text-gray-900">Retour</span>
            </button>
          </div>
          <div className="flex justify-end pt-1.5 ">
            <Button
              onClick={onEdit}
              className={undefined}
              // className="bg-blue-600 hover:bg-blue-700"
              variant={undefined}
              size={undefined}
            >
              Modifier
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gray-100 p-2 rounded-full">
              <FileText className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{getTitle()}</h1>
          </div>

          <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <p className="text-gray-600 text-sm">{getDescription()}</p>
            </div>
          </div>

          <div className="space-y-6">
            {type === "marche" && renderMarcheDetails()}
            {type === "bc" && renderBCDetails()}
            {type === "contrat" && renderContratDetails()}
            {type === "appelOffre" && renderAppelOffreDetails()}
          </div>
        </div>
      </div>
    </div>
  );
}
