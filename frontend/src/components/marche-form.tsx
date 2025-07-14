import React, { useState } from "react";
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
import { Marche } from "@/gestion_marche/types";

// Mock data for dropdowns
const typeBudgets = [
  { id: 1, nom: "Budget d'investissement" },
  { id: 2, nom: "Budget de fonctionnement" },
];

const rubriques = [
  { id: 1, nCompte: "123456", rubrique: "Équipement informatique" },
  { id: 2, nCompte: "789012", rubrique: "Mobilier de bureau" },
  { id: 3, nCompte: "345678", rubrique: "Fournitures de bureau" },
];

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
  const [formData, setFormData] = useState(
    marche || {
      id: 0,
      anneeBudgetaire: new Date().getFullYear().toString(),
      numCompte: "",
      rubrique: "",
      referenceMarche: "",
      objet: "",
      attributaire: "",
      montantMarche: "",
      dateApprobation: "",
      dateVisa: "",
      dateNotificationApprobation: "",
      dateOrdreService: "",
      delaiExecution: "",
      typeBudgetId: "",
      situationMarches: [],
    }
  );

  const [situations, setSituations] = useState(formData.situationMarches || []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRubriqueChange = (value: string) => {
    const selectedRubrique = rubriques.find((r) => r.id.toString() === value);
    if (selectedRubrique) {
      setFormData((prev) => ({
        ...prev,
        numCompte: selectedRubrique.nCompte,
        rubrique: selectedRubrique.rubrique,
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
      montantMarche: Number(formData.montantMarche),
      situationMarches: situations,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      {/* Informations générales du marché */}
      <Card className={undefined}>
        <CardHeader className={undefined}>
          <CardTitle className={undefined}>Informations du marché</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Respecter l'ordre des champs du modèle */}
            <div className="space-y-2">
              <Label htmlFor="anneeBudgetaire" className={undefined}>
                Année budgétaire
              </Label>
              <Input
                id="anneeBudgetaire"
                name="anneeBudgetaire"
                value={formData.anneeBudgetaire}
                onChange={handleChange}
                required
                className={undefined}
                type={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numCompte" className={undefined}>
                Numéro de compte
              </Label>
              <Input
                id="numCompte"
                name="numCompte"
                value={formData.numCompte}
                onChange={handleChange}
                readOnly
                disabled
                className={undefined}
                type={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rubrique" className={undefined}>
                Rubrique
              </Label>
              <Select onValueChange={handleRubriqueChange}>
                <SelectTrigger className={undefined}>
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
              <Label htmlFor="referenceMarche" className={undefined}>
                Référence du marché
              </Label>
              <Input
                id="referenceMarche"
                name="referenceMarche"
                value={formData.referenceMarche}
                onChange={handleChange}
                required
                className={undefined}
                type={undefined}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="objet" className={undefined}>
                Objet
              </Label>
              <Textarea
                id="objet"
                name="objet"
                value={formData.objet}
                onChange={handleChange}
                required
                className={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="attributaire" className={undefined}>
                Attributaire
              </Label>
              <Input
                id="attributaire"
                name="attributaire"
                value={formData.attributaire}
                onChange={handleChange}
                required
                className={undefined}
                type={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="montantMarche" className={undefined}>
                Montant du marché (DH)
              </Label>
              <Input
                id="montantMarche"
                name="montantMarche"
                type="number"
                value={formData.montantMarche}
                onChange={handleChange}
                required
                className={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateApprobation" className={undefined}>
                Date d'approbation
              </Label>
              <Input
                id="dateApprobation"
                name="dateApprobation"
                type="date"
                value={formData.dateApprobation}
                onChange={handleChange}
                required
                className={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateVisa" className={undefined}>
                Date de visa
              </Label>
              <Input
                id="dateVisa"
                name="dateVisa"
                type="date"
                value={formData.dateVisa}
                onChange={handleChange}
                required
                className={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="dateNotificationApprobation"
                className={undefined}
              >
                Date notification d'approbation
              </Label>
              <Input
                id="dateNotificationApprobation"
                name="dateNotificationApprobation"
                type="date"
                value={formData.dateNotificationApprobation}
                onChange={handleChange}
                required
                className={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOrdreService" className={undefined}>
                Date de l'ordre de service
              </Label>
              <Input
                id="dateOrdreService"
                name="dateOrdreService"
                type="date"
                value={formData.dateOrdreService}
                onChange={handleChange}
                required
                className={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="delaiExecution" className={undefined}>
                Délai d'exécution
              </Label>
              <Input
                id="delaiExecution"
                name="delaiExecution"
                value={formData.delaiExecution}
                onChange={handleChange}
                required
                className={undefined}
                type={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="typeBudget" className={undefined}>
                Type de budget
              </Label>
              <Select
                value={formData.typeBudgetId}
                onValueChange={(value) =>
                  handleSelectChange("typeBudgetId", value)
                }
              >
                <SelectTrigger className={undefined}>
                  <SelectValue placeholder="Sélectionner un type de budget" />
                </SelectTrigger>
                <SelectContent className={undefined}>
                  {typeBudgets.map((budget) => (
                    <SelectItem
                      key={budget.id}
                      value={budget.id.toString()}
                      className={undefined}
                    >
                      {budget.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Séparateur entre les sections */}
      <Separator className="my-6" />

      {/* Situations du marché */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Situations du marché</h2>
          <Button
            type="button"
            onClick={addSituation}
            variant="outline"
            className={undefined}
            size={undefined}
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une situation
          </Button>
        </div>

        {situations.length === 0 ? (
          <Card className={undefined}>
            <CardContent className="text-center py-6 text-muted-foreground">
              Aucune situation ajoutée. Cliquez sur "Ajouter une situation" pour
              commencer.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {situations.map((situation, index) => (
              <Card key={situation.id} className={undefined}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">
                      Situation #{index + 1}
                    </CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSituation(index)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className={undefined}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Respecter l'ordre des champs du modèle SituationMarché */}
                    <div className="space-y-2">
                      <Label className={undefined}>
                        Date livraison / exécution
                      </Label>
                      <Input
                        type="date"
                        value={situation.dateLivraison}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "dateLivraison",
                            e.target.value
                          )
                        }
                        className={undefined}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className={undefined}>
                        Date réception provisoire
                      </Label>
                      <Input
                        type="date"
                        value={situation.dateReceptionProvisoire}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "dateReceptionProvisoire",
                            e.target.value
                          )
                        }
                        className={undefined}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className={undefined}>Numéro facture</Label>
                      <Input
                        value={situation.numFacture}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "numFacture",
                            e.target.value
                          )
                        }
                        className={undefined}
                        type={undefined}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className={undefined}>Date d'enregistrement</Label>
                      <Input
                        type="date"
                        value={situation.dateEnregistrement}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "dateEnregistrement",
                            e.target.value
                          )
                        }
                        className={undefined}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className={undefined}>Numéro décompte</Label>
                      <Input
                        value={situation.numDecompte}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "numDecompte",
                            e.target.value
                          )
                        }
                        className={undefined}
                        type={undefined}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className={undefined}>Date service fait</Label>
                      <Input
                        type="date"
                        value={situation.dateServiceFait}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "dateServiceFait",
                            e.target.value
                          )
                        }
                        className={undefined}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className={undefined}>Date de liquidation</Label>
                      <Input
                        type="date"
                        value={situation.dateLiquidation}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "dateLiquidation",
                            e.target.value
                          )
                        }
                        className={undefined}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className={undefined}>
                        Montant de décompte (DH)
                      </Label>
                      <Input
                        type="number"
                        value={situation.montantDecompte}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "montantDecompte",
                            e.target.value
                          )
                        }
                        className={undefined}
                      />
                    </div>

                    <div className="space-y-2 flex items-center">
                      <Label className="flex items-center space-x-2">
                        <Input
                          type="checkbox"
                          className="w-4 h-4"
                          checked={situation.paye}
                          onChange={(e) =>
                            handleSituationChange(
                              index,
                              "paye",
                              e.target.checked
                            )
                          }
                        />
                        <span>Payé</span>
                      </Label>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label className={undefined}>Observation</Label>
                      <Textarea
                        value={situation.observation}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "observation",
                            e.target.value
                          )
                        }
                        className={undefined}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className={undefined}
          size={undefined}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          className={undefined}
          variant={undefined}
          size={undefined}
        >
          Enregistrer
        </Button>
      </div>
    </form>
  );
}
