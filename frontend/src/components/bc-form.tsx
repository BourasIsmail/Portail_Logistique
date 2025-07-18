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

import type {
  BonCommande as BCData,
  SituationBC as SituationBCData,
} from "@/gestion_marche/types";
import api from "@/utils/api";

// Mock data for dropdowns
// const rubriques = [
//   { id: 1, nCompte: "123456", rubrique: "Équipement informatique" },
//   { id: 2, nCompte: "789012", rubrique: "Mobilier de bureau" },
//   { id: 3, nCompte: "345678", rubrique: "Fournitures de bureau" },
// ];

// const pmns = [
//   { id: 1, num: "PMN-2023-001", objet: "Achat de fournitures", montant: 50000 },
//   { id: 2, num: "PMN-2023-002", objet: "Équipement technique", montant: 80000 },
//   {
//     id: 3,
//     num: "PMN-2023-003",
//     objet: "Services informatiques",
//     montant: 120000,
//   },
// ];

type BCFormProps = {
  bc?: BCData | null;
  onSubmit: (data: BCData) => void;
  onCancel: () => void;
};

export default function BCForm({ bc, onSubmit, onCancel }: BCFormProps) {
  const [rubriques, setRubriques] = useState([]);
  const [pmns, setPMNs] = useState([]);

  const [formData, setFormData] = useState(
    bc || {
      id: 0, // Default ID, will be set on submit
      anneeBudgetaire: new Date().getFullYear().toString(),
      numCompte: "",
      rubrique: null,
      rubriqueId: undefined,
      pmn: null,
      pmnId: undefined,
      pmnNum: "",
      pmnObjet: "",
      numBC: "",
      dateBC: "",
      attributaire: "",
      montant: 0,
      dateNotificationBC: "",
      delaiExecution: "",
      situationBCs: [],
    }
  );

  const [situations, setSituations] = useState(formData.situationBCs || []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPMN = async () => {
      const response = await api.get("/admin/get-all-pmn");
      if (response.status === 200) {
        setPMNs(response.data);
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

    fetchPMN();
    fetchRubrique();
  }, []);

  if (loading) {
    return;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "montant" ? Number(value) || 0 : value,
    }));
  };

  /*const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }*/

  const handleRubriqueChange = (value: string) => {
    const selectedRubrique = rubriques.find((r) => r.id.toString() === value);
    if (selectedRubrique) {
      setFormData((prev) => ({
        ...prev,
        rubriqueId: selectedRubrique.id,
        numCompte: selectedRubrique.nCompte,
        rubrique: selectedRubrique,
      }));
    }
  };

  const handlePMNChange = (value: string) => {
    const selectedPMN = pmns.find((p) => p.id.toString() === value);
    if (selectedPMN) {
      setFormData((prev) => ({
        ...prev,
        pmnId: selectedPMN.id,
        pmnNum: selectedPMN.num,
        pmnObjet: selectedPMN.objet,
        pmn: selectedPMN,
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
        dateServiceFait: "",
        dateLiquidation: "",
        montantFacture: 0,
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
    value: string | boolean
  ) => {
    setSituations((prev) =>
      prev.map((situation, i) =>
        i === index
          ? {
              ...situation,
              [field]: field === "montantFacture" ? Number(value) || 0 : value,
            }
          : situation
      )
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ ...formData, situationBCs: situations });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informations générales du BC */}
      <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm pt-0">
        <CardHeader className="border rounded-t-xl border-slate-200/80 bg-slate-50/80 py-2.5 px-6">
          <CardTitle className="text-lg font-semibold text-slate-800">
            Informations du bon de commande
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
            {/* Respecter l'ordre des champs du modèle BC */}
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
              <Label htmlFor="numCompte" className="font-medium text-slate-700">
                Numéro de compte
              </Label>
              <Input
                id="numCompte"
                name="numCompte"
                value={formData.numCompte}
                onChange={handleChange}
                readOnly
                disabled
                className="rounded-md border-slate-300/80 bg-slate-100 shadow-sm"
                type="text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rubrique" className="font-medium text-slate-700">
                Rubrique
              </Label>
              <Select
                value={formData.rubrique?.id?.toString() || ""}
                onValueChange={handleRubriqueChange}
              >
                <SelectTrigger className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500">
                  <SelectValue placeholder="Sélectionner une rubrique" />
                </SelectTrigger>
                <SelectContent className={undefined}>
                  {rubriques.map((rubrique) => (
                    <SelectItem
                      className={undefined}
                      key={rubrique.id}
                      value={rubrique.id.toString()}
                    >
                      {rubrique.nCompte} - {rubrique.rubrique}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pmn" className="font-medium text-slate-700">
                PMN
              </Label>
              <Select
                value={formData.pmnId?.toString() || ""}
                onValueChange={handlePMNChange}
              >
                <SelectTrigger className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500">
                  <SelectValue placeholder="Sélectionner un PMN" />
                </SelectTrigger>
                <SelectContent className={undefined}>
                  {pmns.map((pmn) => (
                    <SelectItem
                      key={pmn.id}
                      value={pmn.id.toString()}
                      className={undefined}
                    >
                      {pmn.num} - {pmn.objet}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numBC" className="font-medium text-slate-700">
                Numéro du BC
              </Label>
              <Input
                id="numBC"
                name="numBC"
                value={formData.numBC}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
                type="text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateBC" className="font-medium text-slate-700">
                Date du BC
              </Label>
              <Input
                id="dateBC"
                name="dateBC"
                type="date"
                value={formData.dateBC}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="attributaire"
                className="font-medium text-slate-700"
              >
                Attributaire
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
              <Label htmlFor="montant" className="font-medium text-slate-700">
                Montant (DH)
              </Label>
              <Input
                id="montant"
                name="montant"
                type="number"
                value={formData.montant}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="dateNotificationBC"
                className="font-medium text-slate-700"
              >
                Date de notification BC
              </Label>
              <Input
                id="dateNotificationBC"
                name="dateNotificationBC"
                type="date"
                value={formData.dateNotificationBC}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="delaiExecution"
                className="font-medium text-slate-700"
              >
                Délai d&apos;exécution
              </Label>
              <Input
                id="delaiExecution"
                name="delaiExecution"
                value={formData.delaiExecution}
                onChange={handleChange}
                required
                className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
                type="text"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Séparateur entre les sections */}
      <Separator className="my-4 mb-5 bg-slate-200/80" />

      {/* Situations du BC */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">
            Situations du bon de commande
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
                Cliquez sur &quot;Ajouter une situation&quot; pour commencer.
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
                <CardContent className="px-6">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                    {/* Respecter l'ordre des champs du modèle SituationBC */}
                    <div className="space-y-2">
                      <Label
                        htmlFor={`dateLivraison-${index}`}
                        className="font-medium text-slate-700"
                      >
                        Date livraison / exécution
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
                        Date réception provisoire
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
                        Numéro facture
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
                        type="text"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor={`dateEnregistrement-${index}`}
                        className="font-medium text-slate-700"
                      >
                        Date d&apos;enregistrement
                      </Label>
                      <Input
                        id={`dateEnregistrement-${index}`}
                        type="date"
                        value={situation.dateEnregistrement}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "dateEnregistrement",
                            e.target.value
                          )
                        }
                        className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor={`dateServiceFait-${index}`}
                        className="font-medium text-slate-700"
                      >
                        Date service fait
                      </Label>
                      <Input
                        id={`dateServiceFait-${index}`}
                        type="date"
                        value={situation.dateServiceFait}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "dateServiceFait",
                            e.target.value
                          )
                        }
                        className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor={`dateLiquidation-${index}`}
                        className="font-medium text-slate-700"
                      >
                        Date liquidation
                      </Label>
                      <Input
                        id={`dateLiquidation-${index}`}
                        type="date"
                        value={situation.dateLiquidation}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "dateLiquidation",
                            e.target.value
                          )
                        }
                        className="rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor={`montantFacture-${index}`}
                        className="font-medium text-slate-700"
                      >
                        Montant facture (DH)
                      </Label>
                      <Input
                        id={`montantFacture-${index}`}
                        type="number"
                        value={situation.montantFacture}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "montantFacture",
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

                    <div className="space-y-2 md:col-span-2">
                      <Label
                        htmlFor={`observation-${index}`}
                        className="font-medium text-slate-700"
                      >
                        Observation
                      </Label>
                      <Textarea
                        id={`observation-${index}`}
                        value={situation.observation}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "observation",
                            e.target.value
                          )
                        }
                        className="min-h-[80px] rounded-md border-slate-300/80 bg-white shadow-sm focus:border-slate-500 focus:ring-slate-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4  mb-4">
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
          {bc ? "Enregistrer" : "Créer"}
        </Button>
      </div>
    </form>
  );
}
