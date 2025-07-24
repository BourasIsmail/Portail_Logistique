import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  AppelOffre,
  Marche,
  Rubrique,
  TypeBudget,
} from "@/gestion_marche/types";
import api from "@/utils/api";

interface MarcheFormProps {
  marche?: Marche;
  onSubmit: (data: Marche) => void;
  onCancel: () => void;
}

export default function MarcheForm({
  marche,
  onSubmit,
  onCancel,
}: MarcheFormProps) {
  const [rubriques, setRubriques] = useState<Rubrique[]>([]);
  const [typeBudget, setTypeBudget] = useState<TypeBudget[]>([]);
  const [appelOffre, setAppelOffre] = useState<AppelOffre[]>([]);
  const [formData, setFormData] = useState(
    marche || {
      id: 0,
      anneeBudgetaire: new Date().getFullYear().toString(),
      numCompte: "",
      referenceMarche: "",
      objet: "",
      attributaire: "",
      montantMarche: 0,
      dateApprobation: "",
      dateVisa: "",
      dateNotificationApprobation: "",
      dateOrdreService: "",
      delaiExecution: "",
      typeBudgetInv: "",
      typeBudgetId: undefined,
      typeBudget: null,
      rubriqueId: undefined,
      rubrique: null,
      appelOffreId: undefined,
      appelOffre: null,
      situationMarches: [],
    }
  );

  const [situations, setSituations] = useState(formData.situationMarches || []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTypeBudgets = async () => {
      const response = await api.get("/admin/get-all-type-budget");
      if (response.status === 200) {
        setTypeBudget(response.data);
      } else {
        console.error("Failed to fetch type budgets");
      }
    };
    const fetchRubrique = async () => {
      const response = await api.get("/admin/get-all-rubrique");
      if (response.status === 200) {
        setRubriques(response.data);
      } else {
        console.error("Failed to fetch type budgets");
      }
      setLoading(false);
    };
    const fetchAppelOffre = async () => {
      const response = await api.get("/admin/get-all-appel-offres");
      if (response.status === 200) {
        setAppelOffre(response.data);
      } else {
        console.error("Failed to fetch appel offres");
      }
    };

    fetchAppelOffre();
    fetchTypeBudgets();
    fetchRubrique();
  }, []);

  if (loading) {
    return;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    const selectedTypeBudget = typeBudget.find(
      (tb) => tb.id.toString() === value
    );

    if (selectedTypeBudget) {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
        typeBudget: selectedTypeBudget,
        typeBudgetInv: selectedTypeBudget.name.includes(
          "Budget d'investissement"
        )
          ? prev.typeBudgetInv
          : "",
      }));
    }
  };

  const handleRubriqueChange = (value: string) => {
    const selectedRubrique = rubriques.find((r) => r.id.toString() === value);
    if (selectedRubrique) {
      setFormData((prev) => ({
        ...prev,
        rubriqueId: Number(value),
        numCompte: selectedRubrique.nCompte,
        rubrique: selectedRubrique,
      }));
    }
  };

  const handleAOChange = (value: string) => {
    const selectedAO = appelOffre.find((r) => r.id.toString() === value);
    if (selectedAO) {
      setFormData((prev) => ({
        ...prev,
        appelOffreId: Number(value),
        appelOffre: selectedAO,
        rubriqueId: selectedAO.rubriqueId,
        rubrique: selectedAO.rubrique,
        objet: selectedAO.objet,
        attributaire: selectedAO.attributaire,
        montantMarche: selectedAO.montant,
      }));
    }
  };

  const addSituation = () => {
    setSituations((prev) => [
      ...prev,
      {
        id: Date.now(), // Temporary ID for UI
        dateLivraison: "",
        dateReceptionProvisoire: "",
        numFacture: "",
        dateEnregistrement: "",
        numDecompte: "",
        dateServiceFait: "",
        dateLiquidation: "",
        montantDecompte: 0,
        paye: false,
        observation: "",
      },
    ]);
  };

  const removeSituation = (index: number) => {
    setSituations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSituationChange = (
    index: number,
    field: string,
    value: string | number | boolean
  ) => {
    setSituations((prev) =>
      prev.map((situation, i) =>
        i === index
          ? {
              ...situation,
              [field]: field === "montantDecompte" ? Number(value) : value,
            }
          : situation
      )
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      typeBudgetId: Number(formData.typeBudgetId),
      rubriqueId: Number(formData.rubrique?.id),
      appelOffreId: Number(formData.appelOffreId),
      situationMarches: situations,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informations générales du marché */}
      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm pt-0">
        <CardHeader className="border rounded-t-xl border-slate-200/80 bg-slate-50/80 py-2.5 px-6">
          <CardTitle className="text-lg font-semibold text-slate-800">
            Informations du marché
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
            {/* Respecter l'ordre des champs du modèle */}
            <div className="space-y-2">
              <Label htmlFor="rubrique" className="font-medium text-slate-700">
                Appel d'offre
              </Label>
              <Select
                value={formData.appelOffre?.id.toString() || ""}
                onValueChange={handleAOChange}
              >
                <SelectTrigger className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500">
                  <SelectValue placeholder="Sélectionner une appel d'offre" />
                </SelectTrigger>
                <SelectContent className={undefined}>
                  {appelOffre.map((ao) => (
                    <SelectItem
                      key={ao.id}
                      value={ao.id.toString()}
                      className={undefined}
                    >
                      {ao.reference}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="referenceMarche"
                className="font-medium text-slate-700"
              >
                Référence du marché
              </Label>
              <Input
                id="referenceMarche"
                name="referenceMarche"
                value={formData.referenceMarche}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
                type="text"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="anneeBudgetaire"
                className="font-medium text-slate-700"
              >
                Année budgétaire
              </Label>
              <Input
                id="anneeBudgetaire"
                name="anneeBudgetaire"
                value={formData.anneeBudgetaire}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
                type="text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rubrique" className="font-medium text-slate-700">
                Rubrique
              </Label>
              <Select
                value={formData.rubrique?.id.toString() || ""}
                onValueChange={handleRubriqueChange}
              >
                <SelectTrigger className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500">
                  <SelectValue placeholder="Sélectionner une rubrique" />
                </SelectTrigger>
                <SelectContent className={undefined}>
                  {rubriques.map((rubrique) => (
                    <SelectItem
                      key={rubrique.id}
                      value={rubrique.id.toString()}
                      className={undefined}
                    >
                      {rubrique.nCompte} - {rubrique.rubrique}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="typeBudget"
                className="font-medium text-slate-700"
              >
                Type de budget
              </Label>
              <Select
                value={formData.typeBudgetId?.toString() || ""}
                onValueChange={(value) =>
                  handleSelectChange("typeBudgetId", value)
                }
              >
                <SelectTrigger className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500">
                  <SelectValue placeholder="Sélectionner un type de budget" />
                </SelectTrigger>
                <SelectContent className={undefined}>
                  {typeBudget.map((budget) => (
                    <SelectItem
                      key={budget.id}
                      value={budget.id.toString()}
                      className={undefined}
                    >
                      {budget.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.typeBudget?.name.includes("Budget d'investissement") && (
              <div className="space-y-2">
                <Label
                  htmlFor="typeBudgetInv"
                  className="font-medium text-slate-700"
                >
                  Type de budget d'investissement
                </Label>
                <Select
                  value={formData.typeBudgetInv || ""}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      typeBudgetInv: value,
                    }))
                  }
                >
                  <SelectTrigger className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent className={undefined}>
                    <SelectItem value="Equipement" className={undefined}>
                      Equipement
                    </SelectItem>
                    <SelectItem value="Travaux" className={undefined}>
                      Travaux
                    </SelectItem>
                    <SelectItem value="Fournitures" className={undefined}>
                      Fournitures
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="objet" className="font-medium text-slate-700">
                Objet
              </Label>
              <Textarea
                id="objet"
                name="objet"
                value={formData.objet}
                onChange={handleChange}
                required
                className="min-h-[100px] rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="attributaire"
                className="font-medium text-slate-700"
              >
                Titulaire de marché
              </Label>
              <Input
                id="attributaire"
                name="attributaire"
                value={formData.attributaire}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
                type="text"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="montantMarche"
                className="font-medium text-slate-700"
              >
                Montant du marché (DH)
              </Label>
              <Input
                id="montantMarche"
                name="montantMarche"
                type="number"
                value={formData.montantMarche}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="dateApprobation"
                className="font-medium text-slate-700"
              >
                Date d'approbation
              </Label>
              <Input
                id="dateApprobation"
                name="dateApprobation"
                type="date"
                value={formData.dateApprobation}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="dateNotificationApprobation"
                className="font-medium text-slate-700"
              >
                Date notification d'approbation
              </Label>
              <Input
                id="dateNotificationApprobation"
                name="dateNotificationApprobation"
                type="date"
                value={formData.dateNotificationApprobation}
                onChange={handleChange}
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="dateOrdreService"
                className="font-medium text-slate-700"
              >
                Date de l'ordre de service
              </Label>
              <Input
                id="dateOrdreService"
                name="dateOrdreService"
                type="date"
                value={formData.dateOrdreService}
                onChange={handleChange}
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateVisa" className="font-medium text-slate-700">
                Date de visa
              </Label>
              <Input
                id="dateVisa"
                name="dateVisa"
                type="date"
                value={formData.dateVisa}
                onChange={handleChange}
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="delaiExecution"
                className="font-medium text-slate-700"
              >
                Délai d'exécution
              </Label>
              <Input
                id="delaiExecution"
                name="delaiExecution"
                value={formData.delaiExecution}
                onChange={handleChange}
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
                type="text"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Séparateur entre les sections */}
      <Separator className="my-4 mb-5 bg-slate-200/80" />

      {/* Situations du marché */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">
            Situations du marché
          </h2>
          <Button
            type="button"
            onClick={addSituation}
            className="flex items-center gap-2 rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-200"
            variant={undefined}
            size={undefined}
          >
            <Plus className="h-4 w-4" />
            Ajouter une situation
          </Button>
        </div>

        {situations.length === 0 ? (
          <Card className="mt-4 border-dashed border-slate-300 bg-slate-50/80 shadow-none">
            <CardContent className="py-10 text-center text-sm text-slate-500">
              <p>Aucune situation ajoutée.</p>
              <p className="mt-1">
                Cliquez sur "Ajouter une situation" pour commencer.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {situations.map((situation, index) => (
              <Card
                key={situation.id}
                className="pt-0 overflow-hidden border-slate-200/80 bg-white shadow-sm"
              >
                <CardHeader className="rounded-t-xl flex flex-row items-center justify-between border border-slate-200/80 bg-slate-50/80 px-4 py-3">
                  <CardTitle className="text-base font-semibold text-slate-800">
                    Situation #{index + 1}
                  </CardTitle>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSituation(index)}
                    className="h-8 w-8 p-0 text-slate-500 hover:bg-slate-200/80 hover:text-slate-900"
                  >
                    <span className="sr-only">Supprimer</span>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4 px-6">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor={`dateLivraison-${index}`}
                        className="font-medium text-slate-700"
                      >
                        Date de livraison
                      </Label>
                      <Input
                        id={`dateLivraison-${index}`}
                        type="date"
                        value={situation.dateLivraison}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "dateLivraison",
                            e.target.value
                          )
                        }
                        className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`dateReception-${index}`}
                        className="font-medium text-slate-700"
                      >
                        Date de réception provisoire
                      </Label>
                      <Input
                        id={`dateReception-${index}`}
                        type="date"
                        value={situation.dateReceptionProvisoire}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "dateReceptionProvisoire",
                            e.target.value
                          )
                        }
                        className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`numFacture-${index}`}
                        className="font-medium text-slate-700"
                      >
                        N° de facture
                      </Label>
                      <Input
                        id={`numFacture-${index}`}
                        value={situation.numFacture}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "numFacture",
                            e.target.value
                          )
                        }
                        className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
                        type={undefined}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`montantDecompte-${index}`}
                        className="font-medium text-slate-700"
                      >
                        Montant du décompte (DH)
                      </Label>
                      <Input
                        id={`montantDecompte-${index}`}
                        type="number"
                        value={situation.montantDecompte}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "montantDecompte",
                            e.target.value
                          )
                        }
                        className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-5">
                      <Input
                        type="checkbox"
                        id={`paye-${index}`}
                        checked={situation.paye}
                        onChange={(e) =>
                          handleSituationChange(index, "paye", e.target.checked)
                        }
                        className="h-4 w-4 rounded border-slate-300 text-slate-600 focus:ring-slate-500"
                      />
                      <Label
                        htmlFor={`paye-${index}`}
                        className="font-medium text-slate-700"
                      >
                        Payé
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mb-4">
        <Button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-300"
          variant={undefined}
          size={undefined}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-900"
          variant={undefined}
          size={undefined}
        >
          {marche ? "Enregistrer" : "Créer"}
        </Button>
      </div>
    </form>
  );
}
