import React from "react";
import { useState } from "react";
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

type ContratFormProps = {
  contrat?: {
    reference: string;
    anneeBudgetaire: string;
    objet: string;
    attributaire: string;
    montant: number;
    dateSignature: string;
    dateDebut: string;
    dateFin: string;
    statut: string;
    typeBudgetId?: string;
    rubriqueId?: string;
    numCompte?: string;
    rubrique?: string;
    description?: string;
  } | null;
  onSubmit: (
    data: ContratFormProps["contrat"] extends null
      ? Omit<NonNullable<ContratFormProps["contrat"]>, "statut"> & {
          statut: string;
        }
      : NonNullable<ContratFormProps["contrat"]>
  ) => void;
  onCancel: () => void;
};

export default function ContratForm({
  contrat = null,
  onSubmit,
  onCancel,
}: ContratFormProps) {
  const [formData, setFormData] = useState(
    contrat || {
      reference: "",
      anneeBudgetaire: new Date().getFullYear().toString(),
      objet: "",
      attributaire: "",
      montant: 0,
      dateSignature: "",
      dateDebut: "",
      dateFin: "",
      statut: "En cours",
      typeBudgetId: "",
      rubriqueId: "",
      numCompte: "",
      rubrique: "",
      description: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "montant" ? Number(value) || 0 : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRubriqueChange = (value: string) => {
    const selectedRubrique = rubriques.find((r) => r.id.toString() === value);
    if (selectedRubrique) {
      setFormData((prev) => ({
        ...prev,
        rubriqueId: value,
        numCompte: selectedRubrique.nCompte,
        rubrique: selectedRubrique.rubrique,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className={undefined}>
        <CardHeader className={undefined}>
          <CardTitle className={undefined}>Informations du contrat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reference" className={undefined}>
                Référence
              </Label>
              <Input
                id="reference"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                required
                className={undefined}
                type={undefined}
              />
            </div>

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

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description" className={undefined}>
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
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
              <Label htmlFor="dateSignature" className={undefined}>
                Date de signature
              </Label>
              <Input
                id="dateSignature"
                name="dateSignature"
                type="date"
                value={formData.dateSignature}
                onChange={handleChange}
                required
                className={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateDebut" className={undefined}>
                Date de début
              </Label>
              <Input
                id="dateDebut"
                name="dateDebut"
                type="date"
                value={formData.dateDebut}
                onChange={handleChange}
                required
                className={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFin" className={undefined}>
                Date de fin
              </Label>
              <Input
                id="dateFin"
                name="dateFin"
                type="date"
                value={formData.dateFin}
                onChange={handleChange}
                required
                className={undefined}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="statut" className={undefined}>
                Statut
              </Label>
              <Select
                value={formData.statut}
                onValueChange={(value) => handleSelectChange("statut", value)}
              >
                <SelectTrigger className={undefined}>
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent className={undefined}>
                  <SelectItem value="En cours" className={undefined}>
                    En cours
                  </SelectItem>
                  <SelectItem value="Terminé" className={undefined}>
                    Terminé
                  </SelectItem>
                  <SelectItem value="Résilié" className={undefined}>
                    Résilié
                  </SelectItem>
                  <SelectItem value="Suspendu" className={undefined}>
                    Suspendu
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

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
