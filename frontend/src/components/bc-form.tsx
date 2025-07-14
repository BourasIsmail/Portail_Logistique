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

// Mock data for dropdowns
const rubriques = [
  { id: 1, nCompte: "123456", rubrique: "Équipement informatique" },
  { id: 2, nCompte: "789012", rubrique: "Mobilier de bureau" },
  { id: 3, nCompte: "345678", rubrique: "Fournitures de bureau" },
];

const pmns = [
  { id: 1, num: "PMN-2023-001", objet: "Achat de fournitures", montant: 50000 },
  { id: 2, num: "PMN-2023-002", objet: "Équipement technique", montant: 80000 },
  {
    id: 3,
    num: "PMN-2023-003",
    objet: "Services informatiques",
    montant: 120000,
  },
];

type SituationBC = {
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
};

type BCData = {
  anneeBudgetaire: string;
  numCompte: string;
  rubrique: string;
  pmnId?: string;
  pmnNum: string;
  pmnObjet: string;
  numBC: string;
  dateBC: string;
  attributaire: string;
  montant: number;
  dateNotificationBC: string;
  delaiExecution: string;
  situationBCs: SituationBC[];
};

type BCFormProps = {
  bc?: BCData | null;
  onSubmit: (data: BCData) => void;
  onCancel: () => void;
};

export default function BCForm({ bc, onSubmit, onCancel }: BCFormProps) {
  const [formData, setFormData] = useState(
    bc || {
      anneeBudgetaire: new Date().getFullYear().toString(),
      numCompte: "",
      rubrique: "",
      pmnId: "",
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
        numCompte: selectedRubrique.nCompte,
        rubrique: selectedRubrique.rubrique,
      }));
    }
  };

  const handlePMNChange = (value: string) => {
    const selectedPMN = pmns.find((p) => p.id.toString() === value);
    if (selectedPMN) {
      setFormData((prev) => ({
        ...prev,
        pmnId: selectedPMN.id.toString(),
        pmnNum: selectedPMN.num,
        pmnObjet: selectedPMN.objet,
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
      <Card className={undefined}>
        <CardHeader className={undefined}>
          <CardTitle className={undefined}>
            Informations du bon de commande
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Respecter l'ordre des champs du modèle BC */}
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
              <Label htmlFor="pmn" className={undefined}>
                PMN
              </Label>
              <Select onValueChange={handlePMNChange}>
                <SelectTrigger className={undefined}>
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
              <Label htmlFor="numBC" className={undefined}>
                Numéro du BC
              </Label>
              <Input
                id="numBC"
                name="numBC"
                value={formData.numBC}
                onChange={handleChange}
                required
                className={undefined}
                type={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateBC" className={undefined}>
                Date du BC
              </Label>
              <Input
                id="dateBC"
                name="dateBC"
                type="date"
                value={formData.dateBC}
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
              <Label htmlFor="montant" className={undefined}>
                Montant (DH)
              </Label>
              <Input
                id="montant"
                name="montant"
                type="number"
                value={formData.montant}
                onChange={handleChange}
                required
                className={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateNotificationBC" className={undefined}>
                Date de notification BC
              </Label>
              <Input
                id="dateNotificationBC"
                name="dateNotificationBC"
                type="date"
                value={formData.dateNotificationBC}
                onChange={handleChange}
                required
                className={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="delaiExecution" className={undefined}>
                Délai d&apos;exécution
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
          </div>
        </CardContent>
      </Card>

      {/* Séparateur entre les sections */}
      <Separator className="my-6" />

      {/* Situations du BC */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Situations du bon de commande
          </h2>
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
              Aucune situation ajoutée. Cliquez sur &quot;Ajouter une
              situation&quot; pour commencer.
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
                    {/* Respecter l'ordre des champs du modèle SituationBC */}
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
                      <Label className={undefined}>
                        Date d&apos;enregistrement
                      </Label>
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
                      <Label className={undefined}>Montant facture (DH)</Label>
                      <Input
                        type="number"
                        value={situation.montantFacture}
                        onChange={(e) =>
                          handleSituationChange(
                            index,
                            "montantFacture",
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
